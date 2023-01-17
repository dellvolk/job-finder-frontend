// @ts-ignore
import toastr from "toastr";
import "toastr/build/toastr.min.css";

// @ts-ignore
toastr.options = { debug: false, positionClass: "toast-top-right", onclick: null,fadeIn: 300,fadeOut: 1000,timeOut: 50000,extendedTimeOut: 1000,};

export const showSuccessMessage = (text:string) => {
	toastr.success(text);
};

export const errorToMsg = (error: string): string => {
    switch (true) {
        case error.includes("auth/invalid-email"):
            return "Your email is not valid"
        case error.includes("auth/weak-password"):
            return "Your password is too weak, try another one";
        case error.includes("auth/email-already-in-use"):
            return "Email already in use, try to Log In";
        case error.includes("auth/wrong-password"):
            return "Wrong password, please try one more time";
    }

    return "Something went wrong. Please, try again later";
};

export function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

export function stringAvatar(name: string) {
    name = name.split('@')[0]
    let [n1, n2] = name.split(' ')
    n1 = n1[0]
    n2 = !!n2 ? n2[0] : n1;
    return {
        children: `${n1}${n2}`.toUpperCase(),
    };
}
