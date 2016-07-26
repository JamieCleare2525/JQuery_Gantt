var task_number = 1;

//adding tasks

$(document).ready(function(){
  $(document).on('click', '.table_add_task', function(){
    if (task_number != 1){
      getDateDifference(task_number);
    }else{
      task_number++;
      addNewTask(task_number);
    }
  });
});

function addNewTask(task_number){
  $("#task_table").append("<tr id='task"+task_number+"'>"+
  "<td>"+task_number+"</td>"+
  "<td><input type='text'></td>"+
  "<td><input id='start"+task_number+"' type='date'></td>"+
  "<td><input id='finish"+task_number+"' type='date'></td>"+
  "<td><input type='number'></td>"+
  "<td><button type='button' class='table_add_task'>+</button></td>"+
  "<td><button type='button' class='table_remove_task' "+
  "onclick='remove_task("+task_number+")'>-</button></td>"+
  "</tr>"
);
}



function getDateDifference(row_number){
  //calculates the difference between when a task begins and when it end.
  if (row_number != 1){
    var oneDay = 24*60*60*1000;
    var start_date = $("#start"+row_number)[0].value;
    var finish_date = $("#finish"+row_number)[0].value;
    start_date = new Date(start_date);
    finish_date = new Date(finish_date);
    var diffDays =
    Math.round((finish_date.getTime() - start_date.getTime())/(oneDay));
    var startDiff = differenceFromStart(row_number);
    if (diffDays < 0){
      window.alert("TASKS MUST FINISH AFTER THE TASK'S START DATE!");
    }else if (startDiff < 0){
      window.alert("TASKS MUST FINISH AFTER THE PROJECT START DATE!");
    }else{
      taskAsBar(diffDays, row_number);
      task_number++;
      addNewTask(task_number);
    }
  }
}

//calculates the difference between the start of the project and a task.
function differenceFromStart(row_number){
  var oneDay = 24*60*60*1000;
  var project_start = $("#start1")[0].value;
  var task_start = $("#start"+row_number)[0].value;
  project_start = new Date(project_start);
  task_start = new Date(task_start);
  var dateDiff =
  Math.round((task_start.getTime() - project_start.getTime())/(oneDay));
  return dateDiff;
}

function taskAsBar(dateDiff, row_number){
  //changes the color of the bar depending on if the task is even or odd
  var color;
  if ((row_number % 2) == 0){
    color = "#3399ff";
  }else{
    color = "#ff0000";
  }
  //creates the bars in the bar chart of the gantt
  var dateInc = differenceFromStart(row_number);
  var svg_area = document.getElementById('gantt_svg');
  svg_area.style.height = (50 * row_number) + 'px';
  var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  rect.setAttributeNS(null, 'id', 'task_bar'+row_number);
  rect.setAttributeNS(null, 'x', 34 * dateInc);
  rect.setAttributeNS(null, 'y', ((34 * (row_number-2))+53));
  rect.setAttributeNS(null, 'height', '34');
  rect.setAttributeNS(null, 'width', '34' * dateDiff);
  rect.setAttributeNS(null, 'fill', color);
  document.getElementById('gantt_svg').appendChild(rect);
  //creates text to appear in the rect.
  var newText = document.createElementNS("http://www.w3.org/2000/svg", "text");
  newText.setAttributeNS(null, 'id', 'bar_text'+row_number);
  newText.setAttributeNS(null, 'x', (34 * dateInc + (dateDiff*16)));
  newText.setAttributeNS(null, 'y', ((34*(row_number-2))+70));
  newText.setAttributeNS(null, 'font-size', "13px");
  newText.setAttributeNS(null, 'text-anchor', "middle");
  newText.setAttributeNS(null, 'alignment-baseline', "middle");
  var textNode = document.createTextNode(''+dateDiff+' days');
  newText.appendChild(textNode);
  document.getElementById('gantt_svg').appendChild(newText);
}

//removing tasks

function remove_task(task_num){
  reduceTaskNumber(task_num);
  removeTaskBar(task_num);
  //var task = document.getElementById("task"+task_num); //javascript
  var task = $('#task'+task_num)[0]; //jQuery - returns HTML object
  //var j_task = $('#task'+task_num); //returns a jQuery object
  //console.log("javascript: "+jtask+", jQuery: "+task) //testing
  var parent = task.parentNode;
  parent.removeChild(task);
  task_number--;
}

function reduceTaskNumber(task_num){
  //get the number of rows in the table.
  //var rows = document.getElementById("task_table").rows.length; //javascript
  var rows = $("#task_table tr").length; //jquery
  //console.log("javascript: "+rows+" jquery: "+jrows);//testing
  for(var i= task_num+1; i < rows; i++){
    document.getElementById("task_table").rows[i].id = "task"+(i-1);
    var task_attr = document.getElementById("task_table").rows[i].cells;
    task_attr[0].innerHTML = (i - 1);
    task_attr[6].innerHTML = "<button type='button' class='table_remove_task' "+
    "onclick='remove_task("+(i - 1)+")'>-</button>"
  }
}

function removeTaskBar(task_num){
  if($('#task_bar'+task_num).length > 0){
    //remove the task bar
    var remove_bar = $("#task_bar"+task_num)[0];
    var bar_parent = remove_bar.parentNode;
    bar_parent.removeChild(remove_bar);
    //remove the tast text
    var remove_text = $("#bar_text"+task_num)[0];
    var text_parent = remove_text.parentNode;
    text_parent.removeChild(remove_text);
    shiftUpBars(task_num);
  }
}

function shiftUpBars(task_num){
  var rows = $("#task_table tr").length;
  rows = rows - 1;
  //console.log("task: "+task_num+" Number of rows: "+rows);
  for (var i = task_num+1; i < rows; i++){
    //moves task bars up
    var bar = $("#task_bar"+i)[0];
    bar_yaxis = bar.getAttribute('y');
    bar_yaxis = (bar_yaxis - 34);
    bar.setAttribute('y', bar_yaxis);
    bar.setAttribute('id', 'task_bar'+(i-1));

    var text = $("#bar_text"+i)[0];
    text_yaxis = text.getAttribute('y');
    text_yaxis = (text_yaxis - 34);
    text.setAttribute('y', text_yaxis);
    text.setAttribute('id', 'bar_text'+(i-1));



  }

}
