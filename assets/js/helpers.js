String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

String.prototype.normText = function () {
    return this.toLowerCase().replace(' ', '').replace('_', '');
};

let getSiblings = function (elem) {
    let siblings = [];
    let sibling = elem.parentNode.firstChild;
    let skipMe = elem;
    for (; sibling; sibling = sibling.nextSibling)
        if (sibling.nodeType === 1 && sibling !== elem)
            siblings.push(sibling);
    return siblings;
};