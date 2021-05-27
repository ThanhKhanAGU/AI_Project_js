var container = document.getElementById("container")
var lim = 1000
var select = 1000
var left=0
var from = true;
var to = true;

document.addEventListener('contextmenu', event => event.preventDefault())
document.addEventListener("mousedown",(e)=>
{
    e.preventDefault()
    left=e.buttons
})
document.addEventListener("mouseup",(e)=>
{
    left=0
})
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
            sml+=   '<div id="_'+x+'_'+y+'" class="Cell" onmouseleave=mousel("_'+x+'_'+y+'") onmouseenter=mousel("_'+x+'_'+y+'") onclick=clickon("_'+x+'_'+y+'")></div>'
            sml+='</div>'
            map[y].push(0)
        }
    }
    container.innerHTML = sml;
    from=true;
    to=true;
} 
function clickon(id_div)
{ 
    data = id_div.split('_')
    x = data[1]
    y = data[2]
    if(select == lim )
    {
        if(!document.getElementById(id_div).classList.contains('to')&& !document.getElementById(id_div).classList.contains('from'))
        if(!document.getElementById(id_div).classList.contains('light'))
        {
            document.getElementById(id_div).classList.add('light')
            
        }  
        else
        {
            document.getElementById(id_div).classList.remove('light')
        }
    }
    else
    if(select == "from" )
    {
        if(!document.getElementById(id_div).classList.contains('to')&& !document.getElementById(id_div).classList.contains('light'))
        if(!document.getElementById(id_div).classList.contains('from') )
        {
            if(from)
            {
                document.getElementById(id_div).classList.add('from')
                from = false
                cell_from=[x,y]
            }
        }
        else
        {
            document.getElementById(id_div).classList.remove('from')
            from = true
            cell_from=[-1,-1]
        }
    }
    else
    if(select == "to" )
    {
        if(!document.getElementById(id_div).classList.contains('from')&& !document.getElementById(id_div).classList.contains('light'))
        if(!document.getElementById(id_div).classList.contains('to'))
        {
            if(to)
            {
                document.getElementById(id_div).classList.add('to')
                to = false
                cell_to=[x,y]
            }
        }
        else
        {
            document.getElementById(id_div).classList.remove('to')
            to = true
            cell_to=[-1,-1]
        }
    }
}
function mousel(id_div)
{
    //show()
    if(select == lim && left==1)
    {
        document.getElementById(id_div).classList.add('light')
    }
    if(select == lim && left==2)
    {
        document.getElementById(id_div).classList.remove('light')
    }
}
function getText()
{
    s=""
    for(let y=0;y<Size;y++)
    for(let x=0;x<Size;x++)
    {
        let value = ''
        if(document.getElementById("_"+x+"_"+y).classList.contains("light"))
        value=1
        if(document.getElementById("_"+x+"_"+y).classList.contains("to"))
        value=2
        if(document.getElementById("_"+x+"_"+y).classList.contains("from"))
        value=3
        s += value+","
    }
    console.log(s);
}
function setText(str)
{
    s = str.split(",");
    sl=0
    Size = Math.sqrt(s.length-1)
    create_map(Size)
    for(let y=0;y<Size;y++)
    for(let x=0;x<Size;x++)
    {
        let data = s[sl++]       
        if(data=='1')
        {
            document.getElementById("_"+x+"_"+y).classList.add('light')
        }
        if(data=='2')
        {
            document.getElementById("_"+x+"_"+y).classList.add('to')
            to=false
            cell_to= [x,y]
        }
        if(data=='3')
        {
            document.getElementById("_"+x+"_"+y).classList.add('from')
            from=false
            cell_from = [x,y]
        }
    }
    
}
f_resize()
create_map(10)
function show()
{
    if(from==false&&to==false)
    for(let y=0;y<Size;y++)
    for(let x=0;x<Size;x++)
    {
        map[x][y] = tinh(x,y)
        document.getElementById("_"+x+"_"+y).innerHTML = "<p class='nd'>"+map[x][y]+"</p>"
    }
}
function tinh(x,y)
{
    a = x-cell_from[0]
    b = y-cell_from[1]
    hx = Math.sqrt(a*a+b*b)
    gx = parseFloat(a+b)
    return parseFloat(gx+hx).toFixed(1)
}
function haaa(x,y)
{
    a = x-cell_from[0]
    b = y-cell_from[1]
    return Math.sqrt(a*a+b*b)
}
function gaaa(x,y)
{
    a = x-cell_from[0]
    b = y-cell_from[1]
    return parseFloat(a+b)
}
setText(",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,2,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,3,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,")
var open = new Array()
var close = new Array()
var step=0
var tmp=1
function Min()
{
    min = [open[0][0],open[0][1]]
    t =0
    for(i=0;i<open.length;i++)
    {
        
        if(y<x)
        {
            min = [open[i][0],open[i][1]]
            t = i
        }
        if(y==x)
        {

        }
    }
    open.splice(t,1)
    return min
}
function cell(x,y)
{
    k = document.getElementById("_"+x+"_"+y)
    return !k.classList.contains("light")
}
function print(open)
{
    s=""
    for(i=0;i<open.length;i++)
    {
        s+="P("+open[i]+")- "+map[open[i][0]][open[i][1]]+", "
    }
    console.log(s)
}
function color(open,close)
{
    for(i=0;i<open.length;i++)
    {
         k = document.getElementById("_"+open[i][0]+"_"+open[i][1])
         k.classList.add("open")
    }
    for(i=0;i<close.length;i++)
    {
        k = document.getElementById("_"+close[i][0]+"_"+close[i][1])
        k.classList.add("close")
    }
}
function addopen(m)
{
    x = parseInt(m[0])
    y = parseInt(m[1])
    if(x-1>=0)open.push([x-1,m[1]])
    if(y-1>=0)open.push([m[0],y-1])
    if((x+1)<Size)open.push([x+1,m[1]])
    if((y+1)<Size)open.push([m[0],y+1])
}
function run(tep)
{
    open = new Array();
    close = new Array();
    open.push([cell_from[0],cell_from[1]])
    for(let i = 0;i<tep;i++)
    {
        m = Min()
        if(m[0]==cell_to[0]&&m[1]==cell_to[1])
        {
            alert("Tìm Thấy");
        }
        addopen(m)
        close.push(m)
        color(open,close)
    }
}



