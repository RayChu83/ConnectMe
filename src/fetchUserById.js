import { doc, getDoc } from "firebase/firestore";
import { db } from "./Firebase/firebase";

async function fetchUserById(userId) {
  const docRef = doc(db, "users", userId);
  const docSnapshot = await getDoc(docRef)
  if (docSnapshot.exists()) {
    let user = docSnapshot.data()
    return user
  } else {
    return null
  }
  }
  
export default fetchUserById