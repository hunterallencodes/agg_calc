const max_fields = 10;
const wrapper_m	= $(".input_fields_wrap_m");
const wrapper_d	= $(".input_fields_wrap_d");
const add_button_m = $(".add_field_button_m");
const add_button_d = $(".add_field_button_d");
const history_btn_d = $("#history_btn_d")

var x = 1;

// Input field add button mobile
$(add_button_m).click(function(e){
  e.preventDefault();
  if(x < max_fields){
    x++;
    $(wrapper_m).append('<div class="input-group mb-3 xtra"><input class="v-size-m form-control w-25" type="number" step="0.25" min="0" name="mytext[]" placeholder="e.g. 1.5" required><button type="button" class="remove_field btn btn-blue-mobile">&nbsp;Remove&nbsp;</button></div>');
  }
});

// Input field add button mobile
$(add_button_d).click(function(e){
  e.preventDefault();
  if(x < max_fields){
    x++;
    $(wrapper_d).append('<div class="input-group mb-3 xtra"><input class="v-size-d form-control w-25" type="number" step="0.25" min="0" name="mytext[]" placeholder="e.g. 1.5" required><button type="button" class="remove_field btn btn-blue">&nbsp;Remove&nbsp;</button></div>');
  }
});

// Input field removal button mobile
$(wrapper_m).on("click",".remove_field", function(e){
  e.preventDefault(); $(this).parent('div').remove(); x--;
});

// Input field removal button desktop
$(wrapper_d).on("click",".remove_field", function(e){
  e.preventDefault(); $(this).parent('div').remove(); x--;
});

$('#history-wrap-d').hide();
$('#drain-history-d').hide();
$('#vent-history-d').hide();

// History toggle desktop
$(history_btn_d).click(function(){
  $('#history-wrap-d').toggle();
  document.getElementById("hist_cont").scrollIntoView({behavior: 'smooth'});
});

// Clear history desktop
$('#clear_history_btn_d').click(function(){
  $('.hist').remove();
  $('#drain-history-d').hide();
  $('#vent-history-d').hide();
  $('#nothing').show();
})

// Mobile form reset
function resetMobile(){
  $(".xtra").remove();
  $("#res1-m").remove();
  $("#res2-m").remove();
  x = 1;
}

// Desktop form reset
function resetDesktop(){
  $(".xtra").remove();
  $("#res1-d").remove();
  $("#res2-d").remove();
  x = 1;
}

// Decimal rounding function
function roundToTwo(num) {
  return (+(Math.round(num + "e+2")  + "e-2"));
}

// Mobile calculator function
function calculateMobile() {
  $("#res1-m").remove();
  $("#res2-m").remove();
  var units = $("input[name=in-mm]:checked").val();
  var numsMobile = [];
  $(".v-size-m").each(function(index) { numsMobile.push($(this).val()) });
  var drain_size = document.getElementById("drain-inp-m").value;
  var drain_area = roundToTwo((3.141592653589793 * ((drain_size/2)**2)));
  var total = 0;
  for (let i=0; i<numsMobile.length; i++) {
    let size = numsMobile[i];
    let size_float = parseFloat(size);
    let size_area = roundToTwo((3.141592653589793 * ((size_float/2)**2)));
    total += parseFloat(size_area);
  }
  var fixed_total = roundToTwo(parseFloat(total));
  var alert1 = "Sufficient venting provided!<br /><b>Drain area:</b> "+drain_area+units+" sq<br /><b>Aggregate cross-sectional venting area:</b> "+fixed_total+units+" sq";
  var alert2 = "Not enough venting provided.<br /><b>Drain area:</b> "+drain_area+units+" sq<br /><b>Aggregate cross-sectional venting area:</b> "+fixed_total+units+" sq";
  if (fixed_total>=drain_area) {
    var el = document.getElementById("response-mobile")
    var p1 = document.createElement("p");
    var p2 = document.createElement("p");
    p1.id = "res1-m";
    p2.id = "res2-m";
    p1.className = "suxes";
    p1.innerText = "Success!";
    p2.innerHTML = alert1;
    el.appendChild(p1);
    el.appendChild(p2);
    document.getElementById("res1-m").scrollIntoView({behavior: 'smooth'});
  }
  else {
    var el = document.getElementById("response-mobile")
    var p1 = document.createElement("p");
    var p2 = document.createElement("p");
    p1.id = "res1-m";
    p2.id = "res2-m";
    p1.className = "uh-oh";
    p1.innerText = "Uh-oh!";
    p2.innerHTML = alert2;
    el.appendChild(p1);
    el.appendChild(p2);
    document.getElementById("res1-m").scrollIntoView({behavior: 'smooth'});
  }

}

// Desktop calculator function
function calculateDesktop() {
  $("#res1-d").remove();
  $("#res2-d").remove();
  $("#nothing").hide();
  $('#drain-history-d').show();
  $('#vent-history-d').show();
  var units = $("input[name=in-mm]:checked").val();
  var numsDesktop = [];
  var history = "";
  $(".v-size-d").each(function(index) { numsDesktop.push($(this).val()) });
  var drain_size = document.getElementById("drain-inp-d").value;
  var drain_area = roundToTwo((3.141592653589793 * ((drain_size/2)**2)));
  var total = 0;
  for (let i=0; i<numsDesktop.length; i++) {
    let size = numsDesktop[i];
    let size_float = parseFloat(size);
    let size_area = roundToTwo((3.141592653589793 * ((size_float/2)**2)));
    total += parseFloat(size_area);
    if (history=="") {
      history += numsDesktop[i];
    }
    else {
      history += ", "+numsDesktop[i];
    }
  }
  var fixed_total = roundToTwo(parseFloat(total));
  var alert1 = "Sufficient venting provided!<br /><b>Drain area:</b> "+drain_area+units+" sq<br /><b>Aggregate cross-sectional venting area:</b> "+fixed_total+units+" sq";
  var alert2 = "Not enough venting provided.<br /><b>Drain area:</b> "+drain_area+units+" sq<br /><b>Aggregate cross-sectional venting area:</b> "+fixed_total+units+" sq";
  if (fixed_total>=drain_area) {
    var el = document.getElementById("response-desktop");
    var drain_wrap = document.getElementById("drain-history-d");
    var vent_wrap = document.getElementById("vent-history-d");
    var p1 = document.createElement("p");
    var p2 = document.createElement("p");
    var phd = document.createElement("p");
    var phv = document.createElement("p");
    p1.id = "res1-d";
    p2.id = "res2-d";
    p1.className = "suxes";
    phd.className = "hist";
    phv.className = "hist";
    p1.innerText = "Success!";
    p2.innerHTML = alert1;
    phd.innerHTML = "&nbsp;<span style='color: #198754'><b>&#10003;</b></span> "+drain_size;
    phv.innerHTML = history;
    el.appendChild(p1);
    el.appendChild(p2);
    drain_wrap.appendChild(phd);
    vent_wrap.appendChild(phv);
  }
  else {
    var el = document.getElementById("response-desktop");
    var drain_wrap = document.getElementById("drain-history-d");
    var vent_wrap = document.getElementById("vent-history-d");
    var p1 = document.createElement("p");
    var p2 = document.createElement("p");
    var phd = document.createElement("p");
    var phv = document.createElement("p");
    p1.id = "res1-d";
    p2.id = "res2-d";
    p1.className = "uh-oh";
    phd.className = "hist";
    phv.className = "hist";
    p1.innerText = "Uh-oh!";
    p2.innerHTML = alert2;
    phd.innerHTML = "&nbsp;<span style='color: #ff6f5e'><b>X</b></span> "+drain_size;
    phv.innerHTML = history;
    el.appendChild(p1);
    el.appendChild(p2);
    drain_wrap.appendChild(phd);
    vent_wrap.appendChild(phv);
  }
}