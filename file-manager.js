// Include fs module
var fs = require("fs");

function useStdin() {
	var input = process.stdin.read();

	if (input === null) {
		return;
	}

	// console.log(input.toString());

	// convert to string, trim whitespace, split to array of words
	var inputSplit = input.toString().trim().split(" ");
// inputSplit === cat file.txt is what is below
	if (inputSplit[0] === "cat") {
		// catFile is a function built below on 26
		 catFile(inputSplit[1]);
	} else if (inputSplit[0] === "touch") {
		//touchFile a function built below on 37
		touchFile(inputSplit[1]);
	}else if (inputSplit[0] === "rm") {
		//replaceFile a function built below
		removeFile(inputSplit[1]);
	}else if (inputSplit[0] === "replace"){
		replaceFile(inputSplit[1], inputSplit[2], inputSplit[3]);
	}else if (inputSplit[0] === "grep") {
		//grepFile a function built below 
		grepFile(inputSplit[1],inputSplit[2]);
	}
}

process.stdin.on("readable", useStdin);



function catFile(fileName) {
	fs.readFile(fileName, function(err, data) {
		if (err) {
			console.log(err);
			return;
		}
		console.log(data.toString());
	});
}

function touchFile(fileName) {
	fs.appendFile(fileName, "", function(err) {
		if (err) {
			console.log(err);
			return;
		}

		console.log("Touched file!");
	});
}

function removeFile(fileName, old){
	fs.unlink(fileName, function (err) {
  if (err){
  	console.log(err);
  }
  console.log('File has been deleted!');
});
}

function replaceFile(fileName, oldWord, newWord){
	fs.readFile(fileName, function(err, data){
		if (err){ 
			console.log(err);
			return;
		}
	var newStr = data.toString().split(oldWord).join(newWord);
	fs.writeFile(fileName, newStr, function (err) {
  		if (err){
			console.log(err);
			return;
		}
  	console.log('Saved!');
});
});
}
	function grepFile(fileName,findItem){
		fs.readFile(fileName,function(err, data){
			if(err){
				console.log(err);
				return;
			}
		var newStr= data.toString().split("\n");
			for(var i = 0; i<newStr.length; i++){
				if(newStr[i].includes(findItem)=== true){
					console.log(i + 1);
				}
			}
			if(newStr[i].includes(findItem)=== false){
					console.log("not found");
				}
		});
	}

/*
Your assignment is to implement the following functionality:
	* remove a file
		"rm" <file name>
		> rm hello.txt
			entirely delete the file hello.txt

	* find and replace a word in the file
		"replace" <file to search> <word to replace> <replacement word>
		> replace hello.txt hello goodbye
			replace all instances of hello in hello.txt with goodbye
		> replace what.txt there their
			replace all instances of there in what.txt with their

	* find a line in a file
		"grep" <file name> <word to find>
		> grep hello.txt hello
			print out all of the lines in hello.txt that contain "hello"
		> grep what.txt there
			print out all of the lines in what.txt that contain "there"

	Bonus work:
		* Ask for confirmation before deleting a file
		* Don't let people delete files that are above the current working directory (i.e. disallow "../")
		* Have grep take a regular expression as the word to find
		* Create mkdir and rmdir
*/

