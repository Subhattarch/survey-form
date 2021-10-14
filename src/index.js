import "./modules/runtime.js";
import $, { get } from "./modules/jquery.js";

$(() => {
    let shouldSubmit = false;
    $("[required]").siblings("label").addClass("required");
    $(".color-option").each(function () {
        $(this).css("--color", $(this).text());
    });
    $("#submit").click(function(e) {
        if(shouldSubmit) return
        const form = $("#survey-form");
        if (!form[0].checkValidity()) return form[0].reportValidity();
        e.preventDefault();
        get(
            "./validate-email",
            {
                email: $("#email").val()
            },
            res => {
                console.log(res, ":", typeof res);
                shouldSubmit = Boolean(res?.validated);
                if (!res?.validated) {
                    $("#email")[0].setCustomValidity("email does not exist");
                    $("#email").change(function () {
                        this.setCustomValidity("");
                    });
                    form[0].reportValidity();
                    return;
                }
                $(this).click()
            },
            "json"
        );
    });
});
