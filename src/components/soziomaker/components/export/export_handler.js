import CreateSoziogramm from "../graphical/CreateSoziogramm";
import {Page} from '@react-pdf/renderer'

class BasicExport {
    constructor(doc) {
        this.document = doc;
    }

    export() {
        return null
    }
}

class PDFExport extends BasicExport {
    constructor(doc) {
        super(doc)
    }

    export() {
        return super.export()
    }
}

class JPGExport extends BasicExport {
    constructor(doc) {
        super(doc)
    }

    export() {
        return super.export()
    }
}

class SVGExport extends BasicExport {
    constructor(doc) {
        super(doc)
    }

    export(refField) {
        let svg = CreateSoziogramm(
            refField,
            this.document,
            true
        )
        console.log(svg, refField.current)
        return svg
    }
}


class ExportFactory {
    constructor() {
    }

    build(doc, type, refField) {
        if (type === "PDF")
            return new PDFExport(doc).export();
        else if (type === "JPG")
            return new JPGExport(doc).export();
        else if (type === "SVG")
            return new SVGExport(doc).export(refField);
        else
            return null
    }
}

export default function ExportHandler(doc, type, refField) {
    let file = new ExportFactory().build(doc, type, refField);
}