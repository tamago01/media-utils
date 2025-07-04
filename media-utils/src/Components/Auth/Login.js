var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { useState } from "react";
import { auth, googleProvider, signInWithEmailAndPassword, signInWithPopup, } from "../../firebase";
import { useNavigate } from "react-router-dom";
import "./login.css";
export default function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => (Object.assign(Object.assign({}, prev), { [name]: value })));
    };
    const handleSubmit = (e) => __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        setError("");
        setLoading(true);
        if (!formData.email || !formData.password) {
            setError("Please fill in all fields");
            setLoading(false);
            return;
        }
        try {
            yield signInWithEmailAndPassword(auth, formData.email, formData.password);
            window.localStorage.setItem("email", formData.email);
            window.alert("Login successful");
            navigate("/dashboard");
        }
        catch (err) {
            console.error(err);
        }
        finally {
            setLoading(false);
        }
    });
    const handleGoogleSignIn = () => __awaiter(this, void 0, void 0, function* () {
        try {
            setLoading(true);
            yield signInWithPopup(auth, googleProvider);
            navigate("/dashboard");
        }
        catch (err) {
            console.error(err);
        }
        finally {
            setLoading(false);
        }
    });
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "wrapper" },
            React.createElement("form", { className: "form_container", onSubmit: handleSubmit },
                React.createElement("div", { className: "logo_container" }),
                React.createElement("div", { className: "title_container" },
                    React.createElement("p", { className: "title" }, "Login to your Account"),
                    React.createElement("span", { className: "subtitle" }, "Get started with our app, just create an account and enjoy the experience.")),
                React.createElement("br", null),
                error && React.createElement("div", { className: "error_message" }, error),
                React.createElement("div", { className: "input_container" },
                    React.createElement("label", { className: "input_label", htmlFor: "email_field" }, "Email"),
                    React.createElement("svg", { fill: "none", viewBox: "0 0 24 24", height: "24", width: "24", xmlns: "http://www.w3.org/2000/svg", className: "icon" },
                        React.createElement("path", { strokeLinejoin: "round", strokeLinecap: "round", strokeWidth: "1.5", stroke: "#141B34", d: "M7 8.5L9.94202 10.2394C11.6572 11.2535 12.3428 11.2535 14.058 10.2394L17 8.5" }),
                        React.createElement("path", { strokeLinejoin: "round", strokeWidth: "1.5", stroke: "#141B34", d: "M2.01577 13.4756C2.08114 16.5412 2.11383 18.0739 3.24496 19.2094C4.37608 20.3448 5.95033 20.3843 9.09883 20.4634C11.0393 20.5122 12.9607 20.5122 14.9012 20.4634C18.0497 20.3843 19.6239 20.3448 20.7551 19.2094C21.8862 18.0739 21.9189 16.5412 21.9842 13.4756C22.0053 12.4899 22.0053 11.5101 21.9842 10.5244C21.9189 7.45886 21.8862 5.92609 20.7551 4.79066C19.6239 3.65523 18.0497 3.61568 14.9012 3.53657C12.9607 3.48781 11.0393 3.48781 9.09882 3.53656C5.95033 3.61566 4.37608 3.65521 3.24495 4.79065C2.11382 5.92608 2.08114 7.45885 2.01576 10.5244C1.99474 11.5101 1.99475 12.4899 2.01577 13.4756Z" })),
                    React.createElement("input", { placeholder: "name@mail.com", title: "Input title", autoComplete: "email", name: "email", type: "email", className: "input_field", id: "email_field", value: formData.email, onChange: handleChange })),
                React.createElement("div", { className: "input_container" },
                    React.createElement("label", { className: "input_label", htmlFor: "password_field" }, "Password"),
                    React.createElement("svg", { fill: "none", viewBox: "0 0 24 24", height: "24", width: "24", xmlns: "http://www.w3.org/2000/svg", className: "icon" },
                        React.createElement("path", { "stroke-linecap": "round", "stroke-width": "1.5", stroke: "#141B34", d: "M18 11.0041C17.4166 9.91704 16.273 9.15775 14.9519 9.0993C13.477 9.03404 11.9788 9 10.329 9C8.67911 9 7.18091 9.03404 5.70604 9.0993C3.95328 9.17685 2.51295 10.4881 2.27882 12.1618C2.12602 13.2541 2 14.3734 2 15.5134C2 16.6534 2.12602 17.7727 2.27882 18.865C2.51295 20.5387 3.95328 21.8499 5.70604 21.9275C6.42013 21.9591 7.26041 21.9834 8 22" }),
                        React.createElement("path", { "stroke-linejoin": "round", "stroke-linecap": "round", "stroke-width": "1.5", stroke: "#141B34", d: "M6 9V6.5C6 4.01472 8.01472 2 10.5 2C12.9853 2 15 4.01472 15 6.5V9" }),
                        React.createElement("path", { fill: "#141B34", d: "M21.2046 15.1045L20.6242 15.6956V15.6956L21.2046 15.1045ZM21.4196 16.4767C21.7461 16.7972 22.2706 16.7924 22.5911 16.466C22.9116 16.1395 22.9068 15.615 22.5804 15.2945L21.4196 16.4767ZM18.0228 15.1045L17.4424 14.5134V14.5134L18.0228 15.1045ZM18.2379 18.0387C18.5643 18.3593 19.0888 18.3545 19.4094 18.028C19.7299 17.7016 19.7251 17.1771 19.3987 16.8565L18.2379 18.0387ZM14.2603 20.7619C13.7039 21.3082 12.7957 21.3082 12.2394 20.7619L11.0786 21.9441C12.2794 23.1232 14.2202 23.1232 15.4211 21.9441L14.2603 20.7619ZM12.2394 20.7619C11.6914 20.2239 11.6914 19.358 12.2394 18.82L11.0786 17.6378C9.86927 18.8252 9.86927 20.7567 11.0786 21.9441L12.2394 20.7619ZM12.2394 18.82C12.7957 18.2737 13.7039 18.2737 14.2603 18.82L15.4211 17.6378C14.2202 16.4587 12.2794 16.4587 11.0786 17.6378L12.2394 18.82ZM14.2603 18.82C14.8082 19.358 14.8082 20.2239 14.2603 20.7619L15.4211 21.9441C16.6304 20.7567 16.6304 18.8252 15.4211 17.6378L14.2603 18.82ZM20.6242 15.6956L21.4196 16.4767L22.5804 15.2945L21.785 14.5134L20.6242 15.6956ZM15.4211 18.82L17.8078 16.4767L16.647 15.2944L14.2603 17.6377L15.4211 18.82ZM17.8078 16.4767L18.6032 15.6956L17.4424 14.5134L16.647 15.2945L17.8078 16.4767ZM16.647 16.4767L18.2379 18.0387L19.3987 16.8565L17.8078 15.2945L16.647 16.4767ZM21.785 14.5134C21.4266 14.1616 21.0998 13.8383 20.7993 13.6131C20.4791 13.3732 20.096 13.1716 19.6137 13.1716V14.8284C19.6145 14.8284 19.619 14.8273 19.6395 14.8357C19.6663 14.8466 19.7183 14.8735 19.806 14.9391C19.9969 15.0822 20.2326 15.3112 20.6242 15.6956L21.785 14.5134ZM18.6032 15.6956C18.9948 15.3112 19.2305 15.0822 19.4215 14.9391C19.5091 14.8735 19.5611 14.8466 19.5879 14.8357C19.6084 14.8273 19.6129 14.8284 19.6137 14.8284V13.1716C19.1314 13.1716 18.7483 13.3732 18.4281 13.6131C18.1276 13.8383 17.8008 14.1616 17.4424 14.5134L18.6032 15.6956Z" })),
                    React.createElement("input", { placeholder: "Password", title: "Input title", name: "password", type: "password", className: "input_field", id: "password_field", value: formData.password, onChange: handleChange })),
                React.createElement("button", { title: "Sign In", type: "submit", className: "sign-in_btn" },
                    React.createElement("span", null, "Sign In")),
                React.createElement("div", { className: "separator" },
                    React.createElement("hr", { className: "line" }),
                    React.createElement("span", null, "Or"),
                    React.createElement("hr", { className: "line" })),
                React.createElement("button", { title: "Sign In", type: "button", onClick: handleGoogleSignIn, disabled: loading, className: "sign-in_ggl" },
                    React.createElement("svg", { stroke: "currentColor", fill: "currentColor", "stroke-width": "0", version: "1.1", x: "0px", y: "0px", className: "google-icon", viewBox: "0 0 48 48", height: "1em", width: "1em", xmlns: "http://www.w3.org/2000/svg" },
                        React.createElement("path", { fill: "#FFC107", d: "M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12\r\n\tc0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24\r\n\tc0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" }),
                        React.createElement("path", { fill: "#FF3D00", d: "M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657\r\n\tC34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" }),
                        React.createElement("path", { fill: "#4CAF50", d: "M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36\r\n\tc-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" }),
                        React.createElement("path", { fill: "#1976D2", d: "M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571\r\n\tc0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" })),
                    React.createElement("span", null, "Sign In with Google"))))));
}
