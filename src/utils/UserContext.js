import { createContext } from "react";
const UserContext = createContext({
    user:{
        bigBid: 0,
        email: "dummy@gmail.com",
    }
});

UserContext.displayName="UserContext"
export default UserContext;