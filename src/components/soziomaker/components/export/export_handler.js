import { jsPDF } from "jspdf";

/**
 * Basic class to derive Export classes from
 */
class BasicExport {
    /**
     * Sets member parameter to member variable
     * @param {Document} doc document to export
     */
    constructor(doc) {
        this.document = doc;
    }

    /**
     * Empty function
     * @returns null
     */
    export() {
        return null
    }
}

/**
 * Export class for picture exort
 */
class JPGExport extends BasicExport {
    /**
     * Sets memeber variables for exporting
     * @param {Docuement} doc docuement to export
     * @param {Boolean} download True if it should be downloaded, false if not
     */
    constructor(doc, download = true) {
        super(doc)
        this._download = download
    }

    /**
     * Triggers exporting SVG to Image
     * @returns Promise for further work
     */
    export() {
        return this._ExportImage()
    }

    /**
     * Private function thath triggers asynchronus export of svg to image
     * @returns Promise of export
     */
    async _ExportImage() {
        const elt = document.querySelector("#graph");
        //Remember all HTML, as we will modify the styles
        const rememberHTML = elt.innerHTML;

        //Set all the css styles inline
        this._inlineStyles(elt);

        //Copy all html to a new canvas
        return await this._copyToCanvas(
            elt,
            1,
            "JPG",
                0.92
        )
        .then(file => {
            //Download if necessary
            if (this._download) this._downloadImage(file, this.document.getDataByKey("title"), "JPG");
            //Undo the changes to inline styles
            elt.innerHTML = rememberHTML;
            return file;
        })
        .catch(console.error);
    }

    /**
     * Private function that copies css information
     * @param {HTMLElement} target Target evg element
     */
    _inlineStyles(target) {
        const selfCopyCss = elt => {
            const computed = window.getComputedStyle(elt);
            const css = {};
            for (let i = 0; i < computed.length; i++) {
                css[computed[i]] = computed.getPropertyValue(computed[i]);
            }
        
            for (const key in css) {
                elt.style[key] = css[key];
            }
             return css;
        }

        const root = target;
        selfCopyCss(root);
        root.querySelectorAll('*').forEach(elt => selfCopyCss(elt));
    }

    /**
     * Private function that copies SVG contents to Canvas in Shadow DOM
     * @param {HTMLElement} canv SVG Element
     * @param {Number} scale scaling factor for exporting
     * @param {String} format Format to export to ("PNG", "JPG", "BMP")
     * @param {Flaot} quality Floating point Value of quality 
     * @returns new Promise of action
     */
    _copyToCanvas (canv, scale, format, quality) {
        var svgData = new XMLSerializer().serializeToString(canv);
        var canvas = document.createElement('canvas');
        var svgSize = canv.getBoundingClientRect();
      
        //Resize can break shadows
        canvas.width = svgSize.width * scale;
        canvas.height = svgSize.height * scale;
        canvas.style.width = svgSize.width;
        canvas.style.height = svgSize.height;
      
        var ctxt = canvas.getContext('2d');
        ctxt.scale(scale, scale);
      
        var img = document.createElement('img');
        img.setAttribute('src', 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData))));
        return new Promise(resolve => {
          img.onload = () => {
            ctxt.drawImage(img, 0, 0);
            const file = canvas.toDataURL(`image/${format}`, (format = 'png'), quality);
            resolve(file);
          };
        });
      };

      /**
       * Private function that downloads file to clients pc
       * @param {String} file file to download
       * @param {String} name name of exported file
       * @param {String} format Fromat of downloaded file
       */
      _downloadImage (file, name, format) {
        var a = document.createElement('a');
        a.className = "display-none";
        a.download = `${name}.${format}`;
        a.href = file;
        document.body.appendChild(a);
        a.click();
      };
}


/**
 * PDF Export Class inherits from JPGExport
 */
 class PDFExport extends JPGExport {
    /**
     * sets member variable to export class
     * @param {Documnt} doc document to export
     */
    constructor(doc) {
        super(doc, false)
    }

    /**
     * Calls export function from super class
     * retrives picture and adds it to pdf file
     */
    export() {   
        super.export()
            .then(fileData => {
                var doc = new jsPDF();
        
                doc.setFontSize(40);
                doc.addImage(fileData, "JPG", 15, 40, 600, 600);    

                doc.save(this.document.getDataByKey("title") + ".pdf")
            }) 
    }
}

/**
 * SVG Export Class
 */
class SVGExport extends BasicExport {
    /**
     * Sets member parameter to member variable
     * @param {Document} doc document to export
     */
    constructor(doc) { 
        super(doc)
    }

    /**
     * Exports given SVG from Document to SCG file
     */
    export() {
                
        var svgBlob = new Blob([this.document.getDataByKey("rw_data").svg], {type:"image/svg+xml;charset=utf-8"});
        var svgUrl = URL.createObjectURL(svgBlob);
        var downloadLink = document.createElement("a");
        
        downloadLink.href = svgUrl;
        downloadLink.download = this.document.getDataByKey("title");
        
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }
}

/**
 * Export Factory Class
 */
class ExportFactory {

    /**
     * Empty for now
     */
    constructor() {
    }

    /**
     * 
     * @param {Document} doc Document to export
     * @param {String} type Type to export to
     * @returns for now returning is optional and not used - RESERVED
     */
    build(doc, type, refField) {
        if (type === "PDF")
            return new PDFExport(doc).export();
        else if (type === "JPG")
            return new JPGExport(doc).export();
        else if (type === "SVG")
            return new SVGExport(doc).export();
        else
            return null
    }
}

export default function ExportHandler(doc, type, callback) {
    let file = new ExportFactory().build(doc, type);
    callback(0)
}