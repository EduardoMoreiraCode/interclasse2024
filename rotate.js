const rotateText = document.getElementById("rotateText");

function rotateVerify() {

    const isSmallWidth = window.innerWidth < 601;
    const isPortrait = window.matchMedia("(orientation: portrait)").matches;
    // modo retrato
    if(isPortrait && isSmallWidth)
    {
        rotateText.style.display = "block";
    }
    else
    // modo paisagem
    {
        rotateText.style.display = "none";
    }
}

// verificar rotação ao carregar a pagina
rotateVerify();

window.addEventListener("orientationchange", rotateVerify);
window.addEventListener("resize", rotateVerify);