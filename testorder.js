let img = ['./img/bananas.png', './img/apple.jpg', './img/pineapple.jpg', './img/orange.jpg', './img/pear.jpg'];
let val8String = ['str1', 'str2', 'str3', 'str4', 'str5'];
function createObj() {

	let n = {
    	'val1': stringRandom(),
        'val2': randomfloat(0, 10).toFixed(2),
        'val3': randomfloat(0, 10).toFixed(4),
        'val4': randomInt(0, 10),
        'val5': randomInt(0, 10),
        'val6': img[randomInt(0,4)],
        'val7': stringRandom(),
        'val8': val8String[randomInt(0,4)],
    }

    return n;
    
}

const deltaIndicator = (params) => {
    const element = document.createElement('span');
    let total = 'Итого';
    const imageElement = document.createElement('img');
    imageElement.style.height = '32px';
    imageElement.style.width = '32px';                       
    if (params.value !== total ){
        imageElement.src =
            img[randomInt(0,4)];
    } else {
        return total;
    } 
    element.appendChild(imageElement);
    return element;
};

let array = [];	
function createArray() {
    
	for (let i = 0; i < 100; i++){
		array.push(createObj());
	}
       
        
}
//Функция случайной строки
function stringRandom(){
	let result = '';
	let words = 'qwertyuiopasdfghjkzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
    for (let i = 0; i < 10; i++){
    	let letter = Math.floor(Math.random() * words.length);
    	result = result + words.substring(letter, letter + 1);
    }
	return result;
}
//Случайное число флоат
function randomfloat(min, max){
	return  min + Math.random() * max - min;
	
}
//Случайное целое число
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
            {
                field:'Col1',  aggFunc: 'total',
                cellRenderer: deltaIndicator,
                tooltipField: 'Col1',
                tooltipComponentParams: { color: '#ececec' },
            },
            {
                field: 'Col2', tooltipField: 'Col2', 

            },
            {
                field: 'Col3' , tooltipField: 'Col3', 
                aggFunc: 'mySum', valueFormatter: `data.Col3 + ' кг'`,
            },
        
        ]
    },
    {
    headerName: 'GROUP2',
        children:[  
            {
                field: "Col4", aggFunc: avgAggFunction,
            },
            {
                field: "Col5",  cellStyle: {'font-weight': 'bold','text-decoration': 'underline',} 
            },
            {
                field: "Col6", filter:true,
            },
        ]
    },
    
];

    
let rowofDataNames = ['Col1', ' Col2', 'Col3', 'Col4', 'Col5', 'Col6'];
let rowData = [];

function arrayList(){
	for (let i = 0; i < array.length; i++){
		

	rowofDataNames = rowData[i];
   
   
	rowData.push({ Col1: array[i].val6, Col2: array[i].val1, 
		           Col3: array[i].val2   , Col4: array[i].val4 + array[i].val5,
		           Col5: array[i].val7, Col6: array[i].val8,  });
    }

    return rowData;

}
console.log(rowData);


const localeText = AG_GRID_LOCALE_RU

const gridOptions = {
   
    defaultColDef: {
        flex:1,
        tooltipComponent: CustomTooltip,  
    },
    autoGroupColumnDef: {
        minWidth: 200,
        cellRendererParams: {
            footerValueGetter : params => {
                return 'Итого';
            },
        }
    },
    aggFuncs: {
        'mySum': params => {
            let sum = 0;
            params.values.forEach(value => sum = parseFloat(sum) + parseFloat(value));
            return sum.toFixed(2) + ' кг';
        }, 
        'total': params => {
            let total = '';
            params.values.forEach(value => total = 'Итого');
            return total ;
        }, 
         
    },
   
    columnDefs: columnDefs, 
    tooltipShowDelay: 0,
    tooltipHideDelay: 2000,
    groupIncludeTotalFooter: true,
  
    rowData: rowData,
    localeText: localeText,

};



document.addEventListener('DOMContentLoaded', () => {
    const gridDiv = document.querySelector('#myGrid');
    new agGrid.Grid(gridDiv, gridOptions);

    
});

function avgAggFunction(params) {
  let sum = 0;
  let count = 0;

  params.values.forEach((value) => {
    const groupNode =
      value !== null && value !== undefined && typeof value === 'object';
    if (groupNode) {
      sum += value.avg * value.count;
      count += value.count;
    } else {
      if (typeof value === 'number') {
        sum += value;
        count++;
      }
    }
  });
  let avg = null;
  if (count !== 0) {
    avg = sum / count;
  }
const result = {
    count: count,
    avg: avg,
    toString: function () {
      return `${this.avg.toFixed(2)}`;
    },
  };

  return result;
}




arrayList();