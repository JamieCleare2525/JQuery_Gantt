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
    //console.log("Drawing Gantt");
    var rows = $("#task_display tr").length;
    //console.log(rows);
    for(var i = 1; i < rows; i++){
      var start_date = $('#task_display')[0];
      console.log(start_date);
    }

  }
