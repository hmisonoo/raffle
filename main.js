const button = document.getElementById('btnId');
button.addEventListener('click',math);

const text_container = document.getElementById('text-container');
let text1 = document.createElement("text");
text1.textContent = "　";
text_container.appendChild(text1);

let winner = [];
const winner_container = document.getElementById('winner-container');
let text2 = document.createElement("text");
text2.textContent = "　";
text2.id = "text2Id";
winner_container.appendChild(text2);

const vbtn = document.getElementById("vbtnId");

//表示ボタン
let sign = false;
vbtn.addEventListener('click',function(){
	let table = document.getElementById('tableId');
	if(sign === false){
		sign = true;
		table.style.visibility = "visible";
	}else{
		table.style.visibility = "hidden";
		sign = false;
	}
})

//ダウンロードボタン
const download_container = document.getElementById('download-container');
const download_btn = document.getElementById('dbtnId');
download_btn.addEventListener('click',downloadCsv)

function math(){
	let min = parseInt(document.getElementById('input1').value,10);
	let max = parseInt(document.getElementById('input2').value,10);
	if(min > max || !min || !max){
		alert('範囲の指定に誤りがあります');
		return;
	}
	const i_container = document.getElementById('input-container');
	i_container.style.display = "none";
	
	download_btn.style.visibility = "visible";
	vbtn.style.visibility = "visible";
	
	const random = min + Math.floor( Math.random() * ( max - min + 1) );
	if(winner.indexOf(random) !== -1){
		console.log('重複です');
		math()
	}else{
		let count = winner.length + 1;
		text1.textContent = random;
		text2.textContent = "当選者　" + count + "名";
		console.log(random);
		const tbody = document.getElementById('tbodyId');
		const newRow = tbody.insertRow();
		const newCell_1 = newRow.insertCell(0);
		const newCell_2 = newRow.insertCell(1);
		const newText_1  = document.createTextNode(count);
		const newText_2  = document.createTextNode(random);
		newCell_1.appendChild(newText_1);
		newCell_2.appendChild(newText_2);
		winner.push(random);
		if(winner.length === max){
			alert('限界です')
			const b_container = document.getElementById('header');
			b_container.removeChild(button)
		}

	}
}

function downloadCsv(){
	const link = document.getElementById("download-csv");
	const csv = winner;
        const csvbuf = csv.join('\r\n');
        
        const bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
        const blob = new Blob([bom, csvbuf], { type: 'text/csv' });
        
        const url = (window.URL || window.webkitURL).createObjectURL(blob);
        
        const fileName = "download.csv";
        if (window.navigator.msSaveOrOpenBlob) {
            // for IE
            link.unbind();
            link.click(function() {
                const retVal = window.navigator.msSaveOrOpenBlob(blob, fileName);
            });
        } else {
            link.setAttribute('download', fileName);
            link.setAttribute('href', url);
        }
	link.click();
}
