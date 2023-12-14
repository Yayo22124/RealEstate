import Dropzone  from "dropzone";

Dropzone.options.imageBox = {
    dictDefaultMessage: "Please load the images about property",
    acceptedFiles: ".png, .jpg, .jpeg, .bmp, .svg",
    maxFilesize: 5,
    maxFiles: 1,
    parallelUploads: 1,
    autoProcessQueue: false,
    addRemoveLinks: true,
    dictRemoveFile: "Delete this image",
    dictMaxFilesExceeded: "Just one image per property",
    paramName: 'imageBox',
    init: function () {
        const Dropzone = this
        const btnPost = document.querySelector('#postImage')

        btnPost.addEventListener('click', function () {
            Dropzone.processQueue()
        })

        Dropzone.on('error', function (file, mensaje) {
            console.log(`hubo un error ${mensaje}`)
        })

        Dropzone.on('queuecomplete', function () {
            if (Dropzone.getActiveFiles().length == 0) {
                window.location.href = '/bienes-raices/user/'
            }
        })
    }

}