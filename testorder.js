let img = ['/bananas.jpg', '/apple.jpg', '/pineapple.jpg', '/orange.jpg', '/pear.jpg'];
function createObj() {

	let n = {
    	'val1': stringRandom(),
        'val2': randomfloat(0, 10).toFixed(2),
        'val3': randomfloat(0, 10).toFixed(4),
        'val4': randomInt(0, 10),
        'val5': randomInt(0, 10),
        'val6': img[randomInt(0,4)],
        'val7': stringRandom(),
        'val8': stringRandom(),
    }

    return n;
    
}

let array = [];	
function createArray() {
    
	for (let i = 0; i < 100; i++){
		array.push(createObj());
	}
   console.log(array.length);      
 console.log(array);
       
        
}
function stringRandom(){
	let result = '';
	let words = 'qwertyuiopasdfghjkzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
    for (let i = 0; i < 10; i++){
    	let letter = Math.floor(Math.random() * words.length);
    	result = result + words.substring(letter, letter + 1);
    }
	return result;
}
function randomfloat(min, max){
	return  min + Math.random() * max - min;
	
}
function randomInt (min , max){
	let random = min + Math.random() * (max + 1 - min);
	return Math.floor(random);
}

createObj();
createArray();


const columnDefs = [
    { 
	headerName: 'GROUP1',

    children: [
        {field:'Col1' },
        {field: 'Col2'},
        {field: 'Col3' },
        
    ]
},
    {
    headerName: 'GROUP2',
    children:[  
        {field: "Col4" },
        {field: "Col5",  cellStyle: {'font-weight': 'bold','text-decoration': 'underline',} },
        {field: "Col6", filter: true,},
        ]
    },



    
];
    
let rowofDataNames = ['Col1', ' Col2', 'Col3', 'Col4', 'Col5', 'Col6'];
let rowData = [];
function arrayList(){
	let sum = 0 ;
	let accum = 0;
	for (let i = 0; i <= 100; i++){
		
	if (i <= 99){

	rowofDataNames = rowData[i];
   sum +=parseFloat(array[i].val2);
   accum += array[i].val4 + array[i].val5;

	
	rowData.push({ Col1: array[i].val6, Col2: array[i].val1, 
		           Col3: array[i].val2 + 'кг', Col4: array[i].val4 + array[i].val5,
		           Col5: array[i].val7, Col6: array[i].val8,  });
    }
if (i == 100){
			rowData.push({Col1: " Итого", Col3 : sum.toFixed(2), Col4: (accum/array.length).toFixed(2),});
		}
}

return rowData;

}


const gridOptions = {
  columnDefs: columnDefs, 
  rowData: rowData,

  onCellClicked: (event) => console.log('rowData.Col1')
};

document.addEventListener('DOMContentLoaded', () => {
    const gridDiv = document.querySelector('#myGrid');
    new agGrid.Grid(gridDiv, gridOptions);
});

console.log(array[0]);
arrayList();