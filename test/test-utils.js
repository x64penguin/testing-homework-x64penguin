async function getElementClass(element) {
    const classRaw = await element.getAttribute("class");

    return classRaw.split(" ");
}

async function elementHasClass(element, _class) { 
    const classes = await getElementClass(element);

    return classes.includes(_class);
}

module.exports = {
    getElementClass,
    elementHasClass
}