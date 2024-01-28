import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "./Firebase/firebase";
import { setLoggedInUsersPosts, setLoggedInUsersPostsCleared } from "./Redux/actions/actions";

async function fetchLoggedInUsersPosts(userId, dispatch) {
    const allUsersPosts = []
    const docRef = collection(db, "posts");
    const q = query(docRef, where("userInfo.userId", "==", userId), orderBy("created", "desc"))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      allUsersPosts.push(doc.data())
    });
    if (allUsersPosts.length === 0) {
      // return a nullish value
      dispatch(setLoggedInUsersPostsCleared())
    }
    else{
      dispatch(setLoggedInUsersPosts(allUsersPosts))
    }
  }
  
export default fetchLoggedInUsersPosts