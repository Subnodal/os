function getURLParameter(name) {
    return decodeURIComponent((new RegExp("[?|&]" + name + "=" + "([^&;]+?)(&|#|;|$)").exec(location.search) || [null, ""])[1].replace(/\+/g, "%20")) || null;
}

$(function() {
    if (getURLParameter("bootable") == "true") {
        $(".nonBootable").hide();
    } else {
        $(".bootable").hide();
    }
});