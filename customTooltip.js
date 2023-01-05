class CustomTooltip {
    
  init(params) {
    const eGui = (this.eGui = document.createElement('div'));
    const color = params.color || 'white';
    const data = params.api.getDisplayedRowAtIndex(params.rowIndex).data;

    eGui.classList.add('custom-tooltip');
    //@ts-ignore
    eGui.style['background-color'] = color;
    eGui.innerHTML = `
            <p>
                <span class"name">${data.Col1}</span>
            </p>
            <p>
                <span>Col2: </span>
                ${data.Col2}
            </p>
            <p>
                <span>Col3: </span>
                ${data.Col3}
            </p>
            <p>
                <span>Col4: </span>
                ${data.Col4}
            </p>
            <p>
                <span>Col5: </span>
                ${data.Col5}
            </p>
            <p>
                <span>Col6: </span>
                ${data.Col6}
            </p>

        `;
  }

  getGui() {
    return this.eGui;
  }
}