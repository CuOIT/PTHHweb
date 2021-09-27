function ucln(a,b)
{
    if(a==0) return b;
    if(b==0) return a;
    if(a<0) a=-a;
    if(b<0) b=-b;
    if(b>a) 
    {
        let c=a
            a=b
            b=c
    }
    for(let i=b;i>0;i--)
        if( a%i==0 && b%i==0) return i; 
}
function toiGian(arr)
{
    uoc=arr[0]
    for(let i=1;i<arr.length;i++)
        uoc=ucln(uoc,arr[i])
    const no=[]
    for(let i=0;i<arr.length;i++)
        no.push(Math.round(arr[i]/uoc))
    return no
}
function phuDaiSo(matrix,x,y)
{
    phudaiso=[];
    for(let i=0;i<matrix.length;i++)
    {
        if(i!=x)
        {
            arr=[]
            for(let j=0;j<matrix.length;j++)
                if(j!=y)
                    arr.push(matrix[i][j]);
            phudaiso.push(arr)
        }
    }
    return phudaiso
}
function dinhThuc(matrix)
{
    if(matrix.length==1) return matrix[0][0];
    if(matrix.length==2) return matrix[0][0]*matrix[1][1]-matrix[0][1]*matrix[1][0];
    if(matrix.length==3) return matrix[0][0]*matrix[1][1]*matrix[2][2]+matrix[0][1]*matrix[1][2]*matrix[2][0]+matrix[0][2]*matrix[1][0]*matrix[2][1]-matrix[0][2]*matrix[1][1]*matrix[2][0]-matrix[0][1]*matrix[1][0]*matrix[2][2]-matrix[0][0]*matrix[1][2]*matrix[2][1];
    if(matrix.length!=3)
    {
        let dt=0;
        for(let i=0;i<matrix.length;i++)
        {
            dt+=((-1)**i)*dinhThuc(phuDaiSo(matrix,0,i))*matrix[0][i]
        }
        return Math.round(dt);
    }
}
function bacThang(matrix)
{
    let n=matrix[0].length;
    let m=matrix.length;
    for(let i=0;i<=n-2;i++)
    {   
        if(matrix[i][i]==0 )
        {
            for(let j=i+1;j<m;j++) if(matrix[j][i]!=0)
            {
                let l=matrix[i].slice();
                matrix[i]=matrix[j].slice();
                matrix[j]=l;
                break;
            }
        }
        for(let j=i+1;j<m;j++)
        {               
            let dau=matrix[j][i];
            for(let k=0;k<n;k++)
            {   
                matrix[j][k]=matrix[i][i]*matrix[j][k]-dau*matrix[i][k];
            }
        }
    }
    // for(let i=m-1;i>0;i--)
    // {
    //     if(matrix[i]==matrix[i-1] || matrix[i].every(function(value){return value==0}))
    //     delete matrix[i];
    //     else matrix[i]=toiGian(matrix[i]);
    // }
    while(matrix.length!=n-1) matrix.pop();
    matrix[0]=toiGian(matrix[0]);
    return matrix;
}
function giai(matrix)
{  
    let n=matrix.length;
    let matranheso=[];
    for(let i=0;i<n;i++)
    {
        let hang=matrix[i].slice();
        hang.pop();
        matranheso.push(hang);
    }
    let D=[];
    for(let j=0;j<n;j++)
    {
        let matrancon=[];
        for(let i=0;i<n;i++)
        {
            matrancon.push(matranheso[i].slice());
            matrancon[i][j]=matrix[i][n];
        }
        D.push(dinhThuc(matrancon));
    }
    D=toiGian(D);
    if(D[0]<0) D=D.map(function(value){
        return Math.abs(value)
    })
    return D;
}
function mahoa(chat)

{  
    while(/[)]/.test(chat)) 
    {
        let ngoac=/[(]([^()]+)[)][0-9]+/.exec(chat);
        let heso=/\d+$/.exec(ngoac[0]);
        let s="";
        for(let i=0;i<heso;i++)
        {
            s+=ngoac[1];
        }
        chat=chat.replace(ngoac[0],s);
    }
    while(/\d/.test(chat)) 
    {
        let nguyento=/([A-Z][a-z]*)\d+/.exec(chat);
        let heso=/\d+$/.exec(nguyento[0]);
        let s="";
        for(let i=0;i<heso;i++)
        {
            s+=nguyento[1];
        }
        chat=chat.replace(nguyento[0],s)
    }
    return chat;
}   
function canbang(pthh)
{   
    pthh=pthh.replace(" ","");
    var nguyento=pthh.match(/[A-Z][a-z]*/g);
    nguyento=new Set(nguyento);
    nguyento=Array.from(nguyento);
    nguyento.sort().reverse();
    let pthh1=pthh.split("=");//pthh1: array which contains two sides
    let thamgia=pthh1[0].split("+");
    let sanpham=pthh1[1].split("+");
    let chat=thamgia.concat(sanpham);
    const chatmahoa=chat.slice();
    for(let i=0;i<chat.length;i++)
     {
         chatmahoa[i]=mahoa(chatmahoa[i]);
     }
    const matrix=[];
    for(let i=0;i<nguyento.length;i++)
    {
        let lst=[];
        for(let j=0;j<chat.length;j++)
        {
            let a=[...chatmahoa[j].matchAll(nguyento[i])].length;
            chatmahoa[j]=chatmahoa[j].replaceAll(nguyento[i],"");
            if(j<thamgia.length) lst.push(a);
            else lst.push(-a);
        }
        lst.push(0);
        matrix.push(lst);
    }
    let lst=[];
    for(let i=0;i<=chat.length;i++)
    {
        if(i==0 || i==chat.length) lst.push(1);
        else lst.push(0);
    }
    matrix.push(lst)
    let bt=bacThang(matrix);
    let no=giai(bt);
    let kq="";
    for(let i=0;i<chat.length;i++)
    {
        if(no[i]!=1) kq=kq+no[i];
        kq=kq+chat[i];
        if(i==thamgia.length-1) kq+="=";
        else if(i!=chat.length-1) kq+="+";
    }
    return kq;
}  
function kq(idx)
{   
    let pthhinput=document.getElementById(idx).value;
    document.getElementById("ketqua").innerHTML=canbang(pthhinput);
}  