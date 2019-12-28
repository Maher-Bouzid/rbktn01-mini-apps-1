function jsonToCsv(json, res) {
    res = res || ["firstName,lastName,county,city,role,sales"]
    let temp = [];
    for (let key in json) {
        if (key !== "children") {
            temp.push(json[key])
        }
    }
    res.push(temp.join(','))
    for (let i = 0; i < json.children.length; i++) {
        jsonToCsv(json.children[i], res)
    }
    return res.join('\n')
}

exports.jsonToCsv = jsonToCsv