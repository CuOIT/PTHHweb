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
        if(matrix[i][i]==0)
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
    if(D[0]<0) D=D.map((value) => Math.abs(value));
    return D;
}
function mahoa(chat)
{
	// Khai triển các nguyên tố trong ngoặc.
	// Ca(HCO3)2 => CaHCO3HCO3
    while(/[(|)]/.test(chat))
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
    // Khai triển nguyên tố.
    // CaHCO3HCO3 => CaHCOOOHCOOO
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
	const elements = new RegExp("(A(c|g|l|m|r|s|t|u))"+
	                            "|(B(a|e|h|k|i|r)?)"+
                                "|(C(a|d|e|f|l|m|n|o|r|s|u)?)"+
                                "|(D(b|s|y))|(E(r|s))"+
                                "|(F(e|m|l|r)?)"+
                                "|(G(a|d|e))"+
                                "|(H(a|e|f|g|s|o)?)"+
                                "|(I(n|r)?)|(K(r)?)"+
                                "|(L(a|i|r|u|v))"+
                                "|(M(c|d|g|n|o|t))"+
                                "|(N(a|e|i)?)|(O(g|s)?)"+
                                "|(P(a|b|d|m|o|r|t|u)?)"+
                                "|(R(a|b|e|f|g|h|n|u))"+
                                "|(S(b|c|e|g|i|m|n|r)?)"+
                                "|(T(a|b|c|e|i|h|l|m|s)?)"+
                                "|(U)|(V)|(W)|(Xe)"+
                                "|(Y(b)?)|(Z(n|r))"
                         );
    var nguyento=pthh.replace(/\s/g).match(/[A-Z][a-z]*/g);
   	if (!nguyento)
   	    throw new SyntaxError(ErrorPrompt.Equation.MissingArgument);
    nguyento=[...new Set(nguyento)];
    var nguyentotontai = nguyento.filter((nt) => elements.test(nt));
//   	console.log(nguyento, nguyentotontai);
   	if (nguyentotontai.length != nguyento.length)
   		throw new SyntaxError(ErrorPrompt.Equation.InvalidArgument);
    nguyento.sort().reverse();
    let pthh1=pthh.split("=");
    if (pthh1.length != 2)
    	throw new SyntaxError(ErrorPrompt.Equation.TooManyArgument);
    let thamgia=pthh1[0].split("+");
    let sanpham=pthh1[1].split("+");
    let chat=thamgia.concat(sanpham);
	const chatmahoa = chat.map(elem => mahoa(elem));
//    console.log(chat, chatmahoa);
    let matrix=[];
    nguyento.forEach((nt) => {
        let lst = [];
        chatmahoa.forEach((entry, idx) => {
            let a = [...entry.matchAll(nt)].length;
            entry = entry.replaceAll(nt,"");
            if (idx < thamgia.length) lst.push(a);
            else lst.push(-a);
        });
        lst.push(0);
        matrix.push(lst);
	});
    let lst = Array(chat.length+1);
    lst.fill(0);
    lst[0] = lst[chat.length] = 1;
    matrix.push(lst);
//    console.log(matrix);
    let bt=bacThang(matrix);
    let no=giai(bt);
    if(no.some((value) => isNaN(value))) return "";
    let kq="";
    chat.forEach((entry, idx) => {
		if(no[idx]!=1) kq=kq+no[idx];
        kq=kq+entry;
        if(idx==thamgia.length-1) kq+=" = ";
        else if(idx!=chat.length-1) kq+=" + ";
    });
    return kq;
}
function kq(idx)
{
    let pthhinput=document.getElementById(idx).value;
    try
    {
    	let ketqua=canbang(pthhinput);
    	document.getElementById("ketqua").innerHTML=ketqua;
    } catch (err) {
       	console.error(err.name, ":", err.message);
    }
}
function lammoi()
{
    document.getElementById("ketqua").innerHTML="";
    //document.getElementById("").oninput="";
    document.querySelector('#pthh').value = '';
}
function coming()
{
    window.alert("Coming soon!");
}