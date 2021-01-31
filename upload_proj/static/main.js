console.log("Hello world")
const uploadForm = document.getElementById("upload_form");
const input = document.getElementById("id_image");
console.log(input);
const alertBox = document.getElementById('alert-box');
const imageBox = document.getElementById('image-box');
const progressBox = document.getElementById('progress-box');
const cancelBox = document.getElementById('cancel-box');
const cancelBtn = document.getElementById('cancel-btn');

const csrf = document.getElementsByName('csrfmiddlewaretoken');
input.addEventListener('change', () => {
    const cancelBox = document.getElementById('cancel-box');
    progressBox.classList.remove('not-visible');
    cancelBox.classList.remove('not-visible');
    const img_data = input.files[0];
    const url = URL.createObjectURL(img_data)
    const fd = new FormData();
    fd.append('csrfmiddlewaretoken', csrf[0].value);
    fd.append('image', img_data)
    $.ajax({
        type: "POST",
        url: uploadForm.action,
        enctype: "multipart/form-data",
        data: fd,
        beforeSend: function () {
            alertBox.innerHTML = ""
            imageBox.innerHTML = ""
        },
        xhr: function () {
            const xhr = new window.XMLHttpRequest();
            xhr.upload.addEventListener('progress', e => {
                if (e.lengthComputable) {
                    const parcent = e.loaded / e.totlal * 100;
                    progressBox.innerHTML = `
                        <div class="progress">
                            <div class="progress-bar" style="width: ${parcent}%" role="progressbar" aria-valuenow="${parcent}" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        <p>${parcent.toFixed(1)}%</p>
                        `;
                }
            });
            cancelBtn.addEventListener('click', () => {
                xhr.abort()
                setTimeout(() => {
                    uploadForm.reset();
                    progressBox.innerHTML = ""
                    alertBox.innerHTML = ""
                    concelBox.classList.add('not-visible')
                }, 2000)
            })
            return xhr;
        },
        success: function (response) {
            console.log(response);
            imageBox.innerHTML = `<img src="${url}" widht="300px" />`
            alertBox.innerHTML = `<div class="alert alert-success" role="alert">
                    Successfully uploaded the image
                </div>`
            concelBox.classList.add('not-visible')
        },
        error: function (error) {
            alertBox.innerHTML = `<div class="alert alert-danger" role="alert">
                    Something wen wrong
                </div>`
        },
        cache: false,
        contentType: false,
        processData: false,
    })
})