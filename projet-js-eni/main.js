//  variable ecran ainsi tou les composants de mon calculatrice
var second_degre_btn,lineaire_btn,resetbtn;
second_degre_btn=document.querySelector("#seconddegre");
lineaire_btn=document.querySelector("#lineaire");
resetbtn=document.querySelectorAll(".containeur .reset");
pub=document.querySelector(".pub");
/* desactivation des area */
second_degre_btn.addEventListener("click",function() {
    document.querySelector(".form1").classList.remove("none");
    document.querySelector(".form2").classList.add("none");
    this.style.borderBottom="3px solid white"
    btn1.style.borderBottom="3px solid white"
    btn2.style.border="none"
    contact.style.borderBottom="none"
    lineaire_btn.style.borderBottom="none"
});

lineaire_btn.addEventListener("click",function() {
    document.querySelector(".form2").classList.remove("none");
    document.querySelector(".form1").classList.add("none");
    this.style.borderBottom="3px solid white"
    btn2.style.borderBottom="3px solid white"
    contact.style.borderBottom="none"
    btn1.style.border="none"
    second_degre_btn.style.borderBottom="none"
});

/*mise a jours des a chaque clique sur reset btn*/


/* animation publicitaires superposée */
var i, urlImage,text;
i=0;
urlImage=["image/image2.jpg","image/image3.jpg","image/image4.jpg"]
text=document.querySelectorAll(".pub h2");

function animation(){ 
    setInterval(function (){
        pub.style.backgroundImage="url('"+urlImage[i]+"')";
        for (var j = 0; j < text.length; j++) {
            text[j].classList.remove("upText");
            text[j].classList.add("downText");
        }
        text[i].classList.remove("downText");
        text[i].classList.add("upText");
        i++;
        if(i>2)i=0;
    },4000);
};
window.onload=animation();

/* Gestion des equation second degre */
var resultx1,resultx2,resolve_btn,input;
resultx1=document.querySelector(".form1 #resultat .x1");
resultx2=document.querySelector(".form1 #resultat .x2");
resolve_btn=document.querySelector("#resoudre")
input=document.querySelectorAll(".form1 .input");

/* controle de frappe au clavier */

for (let i = 0; i < input.length; i++) {
    document.querySelector(".form1 .message").innerHTML="";
     input[i].addEventListener("keyup",function() {
        coeff=document.querySelectorAll(".form1 .coeff");
        if (isNaN(input[i].value)==true) {
            document.querySelector(".form1 .message").innerHTML="Seulement des nombres svp";
        } else {
            coeff[i].innerHTML=input[i].value;
            document.querySelector(".form1 .message").innerHTML="";
        }
    });
}

resolve_btn.addEventListener("click",function() {
    var x1,x2,a,b,c,delta,racine_delta;
    a=document.querySelector("#a").value;
    b=document.querySelector("#b").value;
    c=document.querySelector("#c").value;

    if (a!=""&&b!=""&&c!="" && isNaN(parseFloat(a))==false && isNaN(parseFloat(b))==false&& isNaN(parseFloat(c))==false){
        if (parseFloat(a)==0) {
            x1=-c/b;
            resultx1.innerHTML="x="+x1;
            resultx2.style.display="none";
        }else if(parseFloat(a)==0 && parseFloat(b)==0){
            x1=0;
            resultx1.innerHTML="x="+x1;
            resultx2.style.display="none";
        } else {
            delta=(parseFloat(b)*parseFloat(b))-(4*parseFloat(a)*parseFloat(c));
            if (parseFloat(delta)>0) {
                x1=(-parseFloat(b)-Math.sqrt(delta))/(2*parseInt(a));
                x2=(-parseFloat(b)+Math.sqrt(delta))/(2*parseInt(a));
                resultx2.style.display="block"; 
                resultx1.innerHTML="x1= "+x1
                resultx2.innerHTML="x2= "+x2;
                document.querySelector(".form1 .message").innerHTML="Delta="+delta;
            } else if(parseFloat(delta)==0){
                x1=-parseFloat(b)/(2*parseInt(a));
                resultx1.innerHTML="x="+x1;
                resultx2.style.display="none";
                document.querySelector(".form1 .message").innerHTML="Delta="+delta;
            }else{
                document.querySelector(".form1 .message").innerHTML="Delta = "+delta+" Solution dans c ";
                x1=(-parseFloat(b))/(2*parseFloat(a));
                delta=-delta;
                racine_delta=Math.sqrt(delta)/(2*parseFloat(a));
                resultx1.innerHTML="x1="+x1+" + i"+racine_delta;
                resultx2.innerHTML="x2="+x1+" - i"+racine_delta;
            }
        }
    } else {
        if (a==""||b==""||c=="") {
            document.querySelector(".form1 .message").innerHTML="veuillez completer tous les champs";
        }
    }
    
});


/* gestion des equation lineaire */

function determinant(tab,order) {
  if(order==3){
      return tab[0][0]*((tab[1][1]*tab[2][2])-(tab[2][1]*tab[1][2]))-tab[0][1]*((tab[1][0]*tab[2][2])-(tab[2][0]*tab[1][2]))+tab[0][2]*((tab[1][0]*tab[2][1])-(tab[2][0]*tab[1][1]));
  }else if(order==2){
      return (tab[0][0]*tab[1][1])-(tab[1][0]*tab[0][1]);
  }
}

var elmt,span,resolve_btn2,detM,detX,detY,detZ,elmtB,resultx,resulty,resultz;
elmt=document.querySelectorAll(".form2 .matrice .A .elmt");
elmtB=document.querySelectorAll(".form2 .matrice .B .elmt")
resolve_btn2=document.querySelector(".form2  #resoudre");
span=document.querySelectorAll(".form2  .coeff");
resultx=document.querySelector(".form2 .x");
resulty=document.querySelector(".form2 .y");
resultz=document.querySelector(".form2 .z");

/* controle de frappe */
for (let i = 0; i <elmt.length; i++){
    elmt[i].addEventListener("keyup",function() {
        if (isNaN(elmt[i].value)==true) {
            document.querySelector(".form2 .message").innerHTML="Seulement des nombres svp";
        } else {
            document.querySelector(".form2 .message").innerHTML="";
            span[i].innerHTML=elmt[i].value;
        }
    })
}

for (let i = 0; i <elmtB.length; i++){
    elmtB[i].addEventListener("keyup",function() {
        if (isNaN(elmtB[i].value)==true) {
            document.querySelector(".form2 .message").innerHTML="Seulement des nombres svp";
        } else {
            document.querySelector(".form2 .message").innerHTML="";
        }
    })
}

resolve_btn2.addEventListener("click",function () {
    var matrice,matriceB,x,y,z;
    matrice=[[parseFloat(elmt[0].value),parseFloat(elmt[1].value),parseFloat(elmt[2].value)],[parseFloat(elmt[3].value),parseFloat(elmt[4].value),parseFloat(elmt[5].value)],[parseFloat(elmt[6].value),parseFloat(elmt[7].value),parseFloat(elmt[8].value)]];
    matriceB=[parseFloat(elmtB[0].value),parseFloat(elmtB[1].value),parseFloat(elmtB[2].value)];
    
    for (let i = 0; i < elmt.length; i++) {
        if(elmt[i].value=="" || isNaN(elmt[i].value)==true || elmtB[0].value=="" || elmtB[1].value=="" || elmtB[2].value==""){
            document.querySelector(".form2 .message").innerHTML="Veuillez completer les champs svp";
        }else{
            detM=determinant(matrice,3);
            if (detM!=0) {
                var matriceX=[
                    [parseFloat(matriceB[0]),parseFloat(elmt[1].value),parseFloat(elmt[2].value)],
                    [parseFloat(matriceB[1]),parseFloat(elmt[4].value),parseFloat(elmt[5].value)],
                    [parseFloat(matriceB[2]),parseFloat(elmt[7].value),parseFloat(elmt[8].value)]
                ];
                 var matriceY=[
                    [parseFloat(elmt[0].value),parseFloat(matriceB[0]),parseFloat(elmt[2].value)],
                    [parseFloat(elmt[3].value),parseFloat(matriceB[1]),parseFloat(elmt[5].value)],
                    [parseFloat(elmt[6].value),parseFloat(matriceB[2]),parseFloat(elmt[8].value)]
                ];
                var matriceZ=[
                    [parseFloat(elmt[0].value),parseFloat(elmt[1].value),parseFloat(matriceB[0])],
                    [parseFloat(elmt[3].value),parseFloat(elmt[4].value),parseFloat(matriceB[1])],
                    [parseFloat(elmt[6].value),parseFloat(elmt[7].value),parseFloat(matriceB[2])]
                ];
                detX=determinant(matriceX,3);
                detY=determinant(matriceY,3);
                detZ=determinant(matriceZ,3);
                x=parseFloat(detX)/parseFloat(detM);
                y=parseFloat(detY)/parseFloat(detM);
                z=parseFloat(detZ)/parseFloat(detM); 
                resultx.innerHTML="x ="+x;
                resulty.innerHTML="y ="+y;
                resultz.innerHTML="z ="+z;
                } else {
                    document.querySelector(".form2 .message").innerHTML="la matrice est non inversible";
                    resultx.innerHTML="x =?";
                    resultx.innerHTML="y =?";
                    resultx.innerHTML="z =?";
            }
        }
    } 
})



// humberger menu

var humberger_btn=document.querySelector(".humberger");
var menu_left=document.querySelector(".menu_left")
var close=document.querySelector(".close");

humberger_btn.addEventListener("click",function(){
    menu_left.style.width="100%";
});


close.addEventListener("click",function() {
    menu_left.style.width="0"
})



var btn1,btn2,contact;
btn1=document.querySelector(".menu_left #seconddegre");
btn2=document.querySelector(".menu_left #lineaire");
contact=document.querySelector("#contact");

btn1.addEventListener("click",function() {
    document.querySelector(".form1").classList.remove("none");
    document.querySelector(".form2").classList.add("none");
    this.style.borderBottom="3px solid white"
    btn2.style.borderBottom="none"
    contact.style.borderBottom="none"
    lineaire_btn.style.border="none"
    second_degre_btn.style.borderBottom="3px solid white"
    menu_left.style.width="0"
});

btn2.addEventListener("click",function() {
    document.querySelector(".form2").classList.remove("none");
    document.querySelector(".form1").classList.add("none");
    this.style.borderBottom="3px solid white"
    btn1.style.borderBottom="none"
    contact.style.borderBottom="none"
    lineaire_btn.style.borderBottom="3px solid white"
    second_degre_btn.style.border="none"
    menu_left.style.width="0"
});

contact.addEventListener("click",function() {
    document.querySelector(".form2").classList.remove("none");
    document.querySelector(".form1").classList.add("none");
    this.style.borderBottom="3px solid white"
    btn1.style.borderBottom="none"
    btn2.style.borderBottom="none"
    menu_left.style.width="0"
});

