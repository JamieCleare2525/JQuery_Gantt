$(document).on('turbolinks:load', function(){

  $(".toggle_display").click(function(){
    var ganttVisible = $("#display_gantt").is(":visible");
    $("#create_tasks").toggle("slow");
    $("#display_new_task").toggle();
    $("#gantt_div").toggle("slow");
    $("#display_gantt").toggle();
    //console.log(ganttVisible);
    if(ganttVisible == true){
      drawGantt();
    }
  });
});

//impliments drag and drop
$(document).on('turbolinks:load', function(){
  $('.sortable').sortable({
    items: '.item',
    axis: 'y',
    update: function(event, ui){

      var item_id = ui.item.data('item-id');
      //console.log(item_id);
      var position = ui.item.index();
      //console.log(position);
      var project_id = $('#hidden_page_id')[0].innerHTML;
      //console.log(project_id)
      $.ajax({
        type: 'POST',
        url: '/projects/'+project_id+'/tasks/update_task_number',
        dataType: 'json',
        data: { task: {task_id: item_id, task_number_position: position}}
      }
    )
    drawGantt();
  }

});
});


function drawGantt(){
  var svg = $('#gantt_display')[0];
  while (svg.lastChild){
    svg.removeChild(svg.lastChild);
  }
  var project_start = $('#task_display tr:has(td:contains("Start"))')[0];
  var pro_start_cells = project_start.cells;
  var pro_start_date = pro_start_cells[1].innerHTML;
  console.log(pro_start_date);
  var rows = $("#task_display tr").length;
  //console.log(rows);
  for(var i = 1; i < rows; i++){
    var task_attr = document.getElementById("task_display").rows[i].cells;

    var start = task_attr[1].innerHTML;
    var finish = task_attr[2].innerHTML;
    var dist_from_start = dateDifference(pro_start_date, start);
    //console.log(dist_from_start);
    var barlength = dateDifference(start, finish);
    drawBar(barlength, i, dist_from_start);

  }
}

function dateDifference(early_date, later_date){
  var oneDay = 24*60*60*1000;
  start = new Date(early_date);
  finish = new Date(later_date);
  //console.log("Start: "+start+"Finish: "+finish);
  var dateDiff =
  Math.round((finish.getTime() - start.getTime())/(oneDay));
  //console.log(dateDiff);
  return dateDiff;
}

function drawBar(dateDiff, row_number, dist_from_start){
  //changes the color of the bar depending on if the task is even or odd
  var color;
  if ((row_number % 2) == 0){
    color = "#3399ff";
  }else{
    color = "#ff0000";
  }
  --row_number;
  //creates the bars in the bar chart of the gantt
  //var dateInc = differenceFromStart(row_number);
  var svg_area = document.getElementById('gantt_display');
  svg_area.style.height = (68 * (row_number+1)) + 'px';
  var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  rect.setAttributeNS(null, 'id', 'task_bar'+row_number);
  rect.setAttributeNS(null, 'x', 10 * dist_from_start);
  rect.setAttributeNS(null, 'y', ((50 * (row_number))+20));
  rect.setAttributeNS(null, 'height', '50');
  rect.setAttributeNS(null, 'width', '10' * dateDiff);
  rect.setAttributeNS(null, 'fill', color);
  document.getElementById('gantt_display').appendChild(rect);
  //creates text to appear in the rect.
  var newText = document.createElementNS("http://www.w3.org/2000/svg", "text");
  newText.setAttributeNS(null, 'id', 'bar_text'+row_number);
  newText.setAttributeNS(null, 'x', 20 + (dist_from_start * 10));
  newText.setAttributeNS(null, 'y', ((50*(row_number-1))+90));
  newText.setAttributeNS(null, 'font-size', "10px");
  newText.setAttributeNS(null, 'text-anchor', "middle");
  newText.setAttributeNS(null, 'alignment-baseline', "middle");
  if ((dateDiff == 0)||(isNaN(dateDiff))){
    newText.setAttributeNS(null, 'display', 'none');
  }
  var textNode = document.createTextNode(''+dateDiff+' days');
  newText.appendChild(textNode);
  document.getElementById('gantt_display').appendChild(newText);
}
