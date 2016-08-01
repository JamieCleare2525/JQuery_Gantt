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
  var html_rows = $(".task_display tr").length;
  console.log(html_rows);
  var rows = html_rows - 2;

}


//impliments drag and drop
$(document).on('turbolinks:load', function(){
    $('.sortable').sortable({
      items: '.item',
      axis: 'y',
      update: function(event, ui){

        var item_id = ui.item.data('item-id');
        console.log(item_id);
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
      }

    });
  });
