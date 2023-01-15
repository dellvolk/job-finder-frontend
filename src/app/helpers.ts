// @ts-ignore
import toastr from "toastr";
import "toastr/build/toastr.min.css";

// @ts-ignore
toastr.options = { debug: false, positionClass: "toast-top-right", onclick: null,fadeIn: 300,fadeOut: 1000,timeOut: 50000,extendedTimeOut: 1000,};

export const showSuccessMessage = (text:string) => {
	toastr.success(text);
};
