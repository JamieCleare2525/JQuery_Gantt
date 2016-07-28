$(document).on('turbolinks:load', function(){
  $(".toggle_display").click(function(){
    display_gantt();
    $("#create_tasks").toggle("slow");
    $("#display_new_task").toggle();
    $("#gantt_div").toggle("slow");
    $("#display_gantt").toggle();

  });
});

function display_gantt(){
  var gantt_display = $("#gantt_div").is(":hidden");
  var rows = $(".task_display tr").length;
  console.log(rows);

}
