import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc,getFirestore, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {

    apiKey: "AIzaSyCVY_ApgpwgXhQ3YF9G0PeKsEmQh1beB18",
  
    authDomain: "chat-app-gs-b8e62.firebaseapp.com",
  
    projectId: "chat-app-gs-b8e62",
  
    storageBucket: "chat-app-gs-b8e62.firebasestorage.app",
  
    messagingSenderId: "121391766947",
  
    appId: "1:121391766947:web:a7f6e0bf3a503ce1a78e16"
  
  };

const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const db=getFirestore(app);

const signup=async(username,password)=>{
    try{
        const res= await createUserWithEmailAndPassword(auth,email,password);
        const user=res.user;
        await setDoc(doc(db,"users",user.uid),{
            id:user.uid,
            username:username.toLowerCase(),
            email,
            name:"",
            avatar:"",
            bio:"Hey, There i am using chat-app",
            lastSeen:Date.now()
        })
        await setDoc(doc(db,"chats",user.uid),{
            chatData:[]
        })
    }catch (error){
        console.error(error)
        toast.error(error.code)
    }
}




export{signup}