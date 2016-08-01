$(document).on('turbolinks:load', function(){
  $(".toggle_display").click(function(){
    //drawGantt();
    $("#create_tasks").toggle("slow");
    $("#display_new_task").toggle();
    $("#gantt_div").toggle("slow");
    $("#display_gantt").toggle();

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
  var rows = $("#task_display tr").length;
  //console.log(rows);
  for(var i = 1; i < rows; i++){
    var task_attr = document.getElementById("task_display").rows[i].cells;
    var start = task_attr[1].innerHTML;
    var finish = task_attr[2].innerHTML;
    var barlength = dateDifference(start, finish);
    drawBar(barlength, i);

  }
}

function dateDifference(early_date, later_date){
  var oneDay = 24*60*60*1000;
  start = new Date(early_date);
  finish = new Date(later_date);
  console.log("Start: "+start+"Finish: "+finish);
  var dateDiff =
  Math.round((finish.getTime() - start.getTime())/(oneDay));
  console.log(dateDiff);
  return dateDiff;
}

function drawBar(dateDiff, row_number){
  //changes the color of the bar depending on if the task is even or odd
  var color;
  if ((row_number % 2) == 0){
    color = "#3399ff";
  }else{
    color = "#ff0000";
  }
  //creates the bars in the bar chart of the gantt
  //var dateInc = differenceFromStart(row_number);
  var svg_area = document.getElementById('gantt_display');
  svg_area.style.height = (50 * row_number) + 'px';
  var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  rect.setAttributeNS(null, 'id', 'task_bar'+row_number);
  rect.setAttributeNS(null, 'x', 0);//34 * dateInc);
  rect.setAttributeNS(null, 'y', ((34 * (row_number-2))+53));
  rect.setAttributeNS(null, 'height', '35');
  rect.setAttributeNS(null, 'width', '35' * dateDiff);
  rect.setAttributeNS(null, 'fill', color);
  document.getElementById('gantt_display').appendChild(rect);
  //creates text to appear in the rect.
  var newText = document.createElementNS("http://www.w3.org/2000/svg", "text");
  newText.setAttributeNS(null, 'id', 'bar_text'+row_number);
  newText.setAttributeNS(null, 'x', 0);//(34 * dateInc + (dateDiff*16)));
  newText.setAttributeNS(null, 'y', ((34*(row_number-2))+70));
  newText.setAttributeNS(null, 'font-size', "10px");
  newText.setAttributeNS(null, 'text-anchor', "middle");
  newText.setAttributeNS(null, 'alignment-baseline', "middle");
  if (dateDiff == 0){
    newText.setAttributeNS(null, 'display', 'none');
  }
  var textNode = document.createTextNode(''+dateDiff+' days');
  newText.appendChild(textNode);
  document.getElementById('gantt_display').appendChild(newText);
}
