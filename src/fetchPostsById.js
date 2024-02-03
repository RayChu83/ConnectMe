import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "./Firebase/firebase";

async function fetchPostsById(userId) {
    const allUsersPosts = []
    const docRef = collection(db, "posts");
    const q = query(docRef, where("creator", "==", userId), orderBy("created", "desc"))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      allUsersPosts.push(doc.data())
    });
    if (allUsersPosts.length === 0) {
      // return a nullish value
      return null
    }
    else{
      return allUsersPosts
    }
  }
  
export default fetchPostsById