var container = document.getElementById("container")
var lim =1000
var select = lim;
function f_resize()
{
    container.style.width = container.offsetHeight+"px";
}
// biến quản lý so luong Ô
var Size = 20 // mặc định là 20px
var map = new Array()
function create_map(size) //hàm tạo map
{
    Size = size;
    let sml = ""
    map = new Array();
    for(let y=0;y<size;y++)
    {
        map.push(new Array())
        for(let x=0;x<size;x++)
        {
            sml+='<div class="containCell" style="width: '+(100/Size)+'%;height: '+(100/Size)+'%;">'
            sml+=   '<div id="_'+x+'_'+y+'" class="Cell"  onclick=clickon("_'+x+'_'+y+'")></div>'
            sml+='</div>'
            map[y].push(0)
        }
    }
    container.innerHTML = sml;
} 
function clickon(id_div)
{
    data = id_div.split('_')
    x = data[1]
    y = data[2]
    console.log("x= "+x+" y= "+y);
    if(select == lim )
    {
        if(!document.getElementById(id_div).classList.contains('light'))
        {
            document.getElementById(id_div).classList.add('light')
            map[x][y] = 1000
            
        }  
        else
        {
            document.getElementById(id_div).classList.remove('light')
            map[x][y] = 0
        }
    }
    else
    if(select == "from" )
    {
        if(!document.getElementById(id_div).classList.contains('from'))
        {
            document.getElementById(id_div).classList.add('from')
            map[x][y] = -1
        }
        else
        {
            document.getElementById(id_div).classList.remove('from')
            map[x][y] = 0
        }
    }
    else
    if(select == "to" )
    {
        if(!document.getElementById(id_div).classList.contains('to'))
        {
            document.getElementById(id_div).classList.add('to')
            map[x][y] = -100
        }
        else
        {
            document.getElementById(id_div).classList.remove('to')
            map[x][y] = 0
        }
    }
}

f_resize()
create_map(100)