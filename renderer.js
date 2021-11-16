const ipc = require('electron').ipcRenderer;
const buttonCreated = document.getElementById('upload');
const exec = require('child_process').exec; 

buttonCreated.addEventListener('click', function (event) {
    ipc.send('open-file-dialog-for-file')
    console.log("Button clicked");
});

ipc.on('selected-file', function (event, path) {
    try 
    {
        if (err) 
        {  
            console.error(err);  
            return;  
        }

        var input="C:\\Users\\Aditya Varma\\Desktop\\Input\\sampleVideo.mp4";
        var output="C:\\Users\\Aditya Varma\\Desktop\\Output";

        exec(`ffmpeg -i "${input}" -profile:v baseline -level 3.0 -s 640x360 -start_number 0 -hls_time 50 -hls_list_size 0 -f hls "${output}\\jaga.m3u8"`, (err, stdout, stderr) => {  
          
        console.log(stdout);  
        });
    
    } 
    catch (e) 
    {
        console.log("Error occured!");
    }
});