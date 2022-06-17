import { useAuth } from "../../contexts/AuthContext"

const getKey = () => {
    const { currentUser } = useAuth()

    let nonce = process.env.REACT_APP_SECRET
    let key = CryptoJS.HmacSHA256(nonce + currentUser.uid);

    return key
}

export function Encrypt(data) {
    var crypted = CryptoJS.AES.encrypt(JSON.stringify(data), getKey()).toString();

    return crypted

}

export function Decrypt(data) {
    var bytes  = CryptoJS.AES.decrypt(data, getKey());
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    return decryptedData
}