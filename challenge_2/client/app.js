document.querySelector('input[type=submit]').addEventListener("click", async (e) => {
    e.preventDefault();

    const file = document.querySelector('#file').files[0];

    await grabFile(file)
        .then(data => {
            return sendData(data)
        })
        .then(data => {
            console.log(data)
        })



    // sendData(data.slice(0, data.length - 1))
    //     .then((csv) => {
    //         console.log({ csv })
    //         console.log(csv.split('\n'))
    //     })
    //     .catch(err => {
    //         console.log({ err })
    //     })
})

function sendData(data) {
    return $.ajax({
        url: '/form',
        type: 'POST',
        data: { data }
    })
};

let grabFile = async (file) => {
    return new Promise((res, rej) => {
        let reader = new FileReader();
        reader.readAsText(file);
        reader.onload = (event) => {
            res(event.target.result);
        }
    })
}