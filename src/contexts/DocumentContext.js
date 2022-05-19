import React, { useContext, useState } from "react"
import { collection, getDocs,  query, where } from 'firebase/firestore';
import { store } from "../APIs/firebase"
import { useAuth } from "./AuthContext";


const default_document = {
    createdAt: "16:31 17.05.2022",
    title: "Default",
    owner: "",
    cnt_id: "",
    rw_data: {
        Childs: [{
            id: 1,
            name: "Kind 1",
            age: "2.5",
            gender: "Weiblich"  
          },
          {
            id: 2,
            name: "Kind 2",
            age: "4",
            gender: "Männlich"  
          },
          {
            id: 3,
            name: "Kind 3",
            age: "5.3",
            gender: "Divers"  
          },
          {
            id: 4,
            name: "Kind 4",
            age: "3.8",
            gender: "Weiblich"  
          }],
        Relations: [{
            ChildId: 1,
            affected: [],
            aversion: []
        }],
        svg: ""
    }
}

class Document {
    constructor() {
        this.data = {}
    }

    addData(key, value) {
        this.data[key] = value;
        return this;
    }

    getDataByKey(key) {
        if (key in this.data) {
            return this.data.key;
        }
        else {
            return "";
        }
    }  

    getData() {
        return this.data;
    }
}

const DocumentConverter = {
    toFirestore: (document) => {
        return document.getData();
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Document()
                    .addData("createdAt", data.createdAt)
                    .addData("title", data.title)
                    .addData("owner", data.owner)
                    .addData("rw_data", data.rw_data)
                    .addData("last_edited", data.lastEdited)
    }

}


const DocumentContext = React.createContext();

export function useDocContext() {
    return useContext(DocumentContext)
}

/*
    General Structur of handled documents
    Each Document will represent a singel item with in the state.Documents array
    A Document in certain will have the following structue
    createdAt: DateTime Stamp of Server
    title: Title of document
    owner: will be the uid of the creating user
    rw_data: will be the raw data format the app is using -> Structure needs to be defined
    last_edited: DateTime Stamp of server from last saving process
*/
export function DocumentProvider({ children }) {

    const [Documents, setDocuments] = useState(
        JSON.parse(localStorage.getItem("documents")) || []
    );
    const [currentDocument, setCurrentDoc] = useState(
        JSON.parse(localStorage.getItem("currentDocument")) || 0
    )
    const [loading, setLoading] = useState(false)

    const { currentUser } = useAuth();

    async function _request_documents() {    
        const q = query(collection(store, "diagramms"), 
                        where("owner", "==", this.state.user.uid));

        const querySnapshot = await getDocs(q);
        
        let _docs = []
        querySnapshot.forEach((data) => {
            _docs.push(new Document()
                            .addData("createdAt", data.createdAt)
                            .addData("title", data.title)
                            .addData("owner", data.owner)
                            .addData("rw_data", data.rw_data)
                            .addData("last_edited", data.lastEdited));
        });

        // this creates a true deep copy of docs 
        // https://dev.to/samanthaming/how-to-deep-clone-an-array-in-javascript-3cig
        setDocuments([..._docs]);
    }

    async function _set_documents() {
    }

    function createDocument() {
        let newDoc = {
            owner: currentUser.uid,
            title: "Test"
        };
        Documents.push(newDoc);
        localStorage.setItem("documents", JSON.stringify(Documents));
        setDocuments(Documents);
    }

    function getDocuments() {
        if (Documents.length === 0) {
            Documents.push(default_document);
        }
        return Documents;
    }

    function getDocument(idx) {
        return Documents[idx];
    }

    function setCurrentDocument(idx) {
        localStorage.setItem("currentDocument", JSON.stringify(getDocument(idx)));
        setCurrentDoc(getDocument(idx));
    }

    function updateDocument(document) {
        setCurrentDoc(document)
        Documents.forEach(doc => {
            if (doc.cnt_id === document.cnt_id) {
                doc = document
            }
        });
        localStorage.setItem("documents", JSON.stringify(Documents));
        setDocuments(Documents);
    }

    const value = {
        currentDocument,
        getDocuments,
        getDocument,
        createDocument,
        setCurrentDocument,
        updateDocument,
    }

   return(
        <DocumentContext.Provider value={value}>
            {!loading && children}
        </DocumentContext.Provider>
    );
}
