
import toast from "react-hot-toast";

export async function updatePassword(passwords: any, token: string) {
    try {
        const res = await fetch("https://ecommerce.routemisr.com/api/v1/users/changeMyPassword", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                token: token
            },
            body: JSON.stringify(passwords)
        });

        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Update password error:", error);
        return { status: "error", message: "Something went wrong" };
    }
}
