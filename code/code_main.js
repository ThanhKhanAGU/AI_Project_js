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
setText("3,,,,,,,,,,,,,,1,,1,,1,1,1,1,1,1,1,1,,1,,,,1,,,,,,,,,,,1,,1,,1,,1,1,1,,1,,,,1,1,,,,1,,1,,1,,,,1,,1,,1,,,1,,1,,1,1,1,,1,,1,,,,,1,,1,,,,,,1,,1,1,1,,,,,,,1,,1,1,1,,1,,,,,,,1,1,1,,1,,,,1,,1,1,,1,,1,,,,,,1,,1,,1,,,1,,1,,,1,1,1,1,,,,1,,,1,,1,,,,,,,,,,,,,1,,,,1,1,1,,1,1,1,,1,1,,1,1,1,1,,,1,,1,,,,1,,,,,,,,,,,1,,1,,,2,")
function GetMap(x,y)
{
    a = x-cell_from[0]
    b = y-cell_from[1]
    hx = Math.sqrt(a*a+b*b)
    gx = parseFloat(a+b)
    if(!document.getElementById("_"+x+"_"+y).classList.contains("light"))
        return parseFloat(gx+hx)
    else
        return null
}
function getHx(x,y)
{
    a = x-cell_from[0]
    b = y-cell_from[1]
    return Math.sqrt(a*a+b*b)
}
function getGx(x,y)
{
    a = x-cell_from[0]
    b = y-cell_from[1]
    return parseFloat(a+b)
}
function show(type=1)
{
    if(from==false&&to==false)
    for(let y=0;y<Size;y++)
    for(let x=0;x<Size;x++)
    {
        if(type==1)map[x][y] = (getHx(x,y)+getGx(x,y)).toFixed(1)
        if(type==2)map[x][y] = getHx(x,y).toFixed(1)
        if(type==3)map[x][y] = getGx(x,y).toFixed(1)
        document.getElementById("_"+x+"_"+y).innerHTML = "<p class='nd'>"+map[x][y]+"</p>"
    }
}
var open = new Array()//mảng toàn cục chức phần tử open
var close = new Array() //mảng toàn cục chứa các phần close 
function print(m)
{
    return "P("+m[0]+","+m[1]+")"
}
function printArray()
{
    s="open: "
    open.forEach(item=>{
        s+= print(item)+", "
    })
    s+="\nclose: "
    close.forEach(item=>{
        s+= print(item)+", "
    })
    return s
} 
function isexist(m)
{
    for(i=0;i<close.length;i++)
    {
        if(close[i][0]==m[0]&&close[i][1]==m[1])
        {
            return true
        }
    }
    return false
}
function addopen(m)
{
    close.push([m[0],m[1]])
    if(m[0]+1<Size&&GetMap(m[0]+1,m[1])!=null)
    {
        if(!isexist([m[0]+1,m[1]]))
        {
            open.push([m[0]+1,m[1]])
        }
    }
    if(m[1]+1<Size&&GetMap(m[0],m[1]+1)!=null)
    {
        if(!isexist([m[0],m[1]+1]))
        {
            open.push([m[0],m[1]+1])
        }
    }
    if(m[0]-1>=0&&GetMap(m[0]-1,m[1])!=null)
    {
        if(!isexist([m[0]-1,m[1]]))
        {
            open.push([m[0]-1,m[1]])
        }
    }
    if(m[1]-1>=0&&GetMap(m[0],m[1]-1)!=null)
    {
        if(!isexist([m[0],m[1]-1]))
        {
            open.push([m[0],m[1]-1])
        }
    }
    vt = 0;
    for(i=0;i<open.length;i++)
    {
        if(open[i][0]==m[0]&&open[i][1]==m[1])
        {
            vt = i;
            break;
        }
    }
    open.splice(vt,1);
   
}
function color()
{
    close.forEach(i=>{
        document.getElementById("_"+i[0]+"_"+i[1]).classList.add("close")
    })
    open.forEach(i=>{
        document.getElementById("_"+i[0]+"_"+i[1]).classList.add("open")
    })
}
function getMinOpen()
{
    min = [open[0][0],open[0][1]]
    for(i=1;i<open.length;i++)
    {
        if(GetMap(min[0],min[1])>GetMap(open[i][0],open[i][1]))
        {
            min = [open[i][0],open[i][1]]
        }
    }
    return min
}
function run(tem)
{
    open = new Array()
    close = new Array()
    open.push([cell_from[0],cell_from[1]])
    for(item = 0;item<tem;item++)
    {
       min = getMinOpen()
       console.log(min)
       addopen(min)
       color()
    }
}