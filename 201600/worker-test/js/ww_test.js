function start(){
	var worker = new Worker("./js/get.js");
	worker.postMessage(
	        {
	            path:'/v1/note/get_content',
	            page:1,
	            noteId: 2618441975556219776,
	            boxName: 'des-text-box'
	        }
	);
	worker.onmessage=function(message){
	    console.log(message);
		//worker.terminate();
	};
	worker.onerror=function(error){
	    console.log(error);
	}
}

document.getElementById('p').onclick = function(){
	start();
}