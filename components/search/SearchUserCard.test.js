import React from "react";
import SearchUserCard from "../../components/search/SearchUserCard";
import { render } from "@testing-library/react-native";

test("test search user card displays name and view profile icon", () => {
    const user = {
        name: {
            first: "John",
            middle: "",
            last: "Doe"
        },
        isStaff: true,
    }

    const { getByText, getByTestId, debug } = render(<SearchUserCard user={user} />);

    getByText("John Doe");
    getByTestId("SearchUserCard.PersonIcon");
});

test("test search user card displays name and chat profile icon", () => {
    const user = {
        name: {
            first: "John",
            middle: "",
            last: "Doe"
        },
        isStaff: true,
    }

    const { getByText, getByTestId, debug } = render(<SearchUserCard user={user} type="chat" />);

    getByText("John Doe");
    getByTestId("SearchUserCard.ChatIcon");
});