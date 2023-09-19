#include <linux/module.h>
#include <linux/init.h>
#include <linux/proc_fs.h>
#include <linux/sched/signal.h>
#include <linux/seq_file.h>
#include <linux/fs.h>
#include <linux/sched.h>
#include <linux/mm.h>

MODULE_LICENSE("GPL");
MODULE_AUTHOR("201900042");
MODULE_DESCRIPTION("Proyecto 1");

struct task_struct *task;
struct mm_struct *mm;

struct sysinfo si;

static void init_meminfo(void){
    si_meminfo(&si);
}

static int escribir_archivo(struct seq_file *file_proc, void *v){
    
    unsigned long total_cpu_time = jiffies_to_msecs(get_jiffies_64());
    unsigned long total_usage = 0;
    unsigned long rss;

    init_meminfo();
    for_each_process(task){
        unsigned long cpu_time = jiffies_to_msecs(task->utime + task->stime);
        unsigned long cpu_percentage_cien = cpu_time * 100;
        unsigned long cpu_percentage = cpu_percentage_cien / total_cpu_time;
        total_usage += cpu_time;
    }
    long total_1 = total_usage * 100;
    long total_2 = total_1 / total_cpu_time;
    seq_printf(file_proc, "{\n\"porcentaje_cpu\":%ld,\n", total_2);
    seq_printf(file_proc, "\"procesos\":[");
    int i = 0;
    
    for_each_process(task){
        mm = get_task_mm(task);
        if(i != 0){
            seq_printf(file_proc, ",\n");
        }else{
            seq_printf(file_proc, "\n");
        }
        if (task->mm){
            rss = get_mm_rss(task->mm) << PAGE_SHIFT;
        }else{
            rss = 0;
        }

        seq_printf(file_proc, "{\n\"pid\":%d,\n", task->pid);
        seq_printf(file_proc, "\"nombre\":\"%s\",\n", task->comm);
        seq_printf(file_proc, "\"usuario\":%d,\n", task->cred->uid);
        if(task->__state == TASK_RUNNING){
            seq_printf(file_proc, "\"estado\":\"running\",\n");
        }else if(task->__state == TASK_INTERRUPTIBLE){
            seq_printf(file_proc, "\"estado\":\"interruptible\",\n");
        }else if(task->__state == TASK_UNINTERRUPTIBLE){
            seq_printf(file_proc, "\"estado\":\"no interrumpible\",\n");
        }else if(task->__state == __TASK_STOPPED){
            seq_printf(file_proc, "\"estado\":\"stopped\",\n");
        }else if(task->__state == __TASK_TRACED){
            seq_printf(file_proc, "\"estado\":\"traced\",\n");
        }else if(task->__state == TASK_DEAD){
            seq_printf(file_proc, "\"estado\":\"dead\",\n");
        }else{
            seq_printf(file_proc, "\"estado\":\"unknown\",\n");
        }
        long total_ram = si.totalram*si.mem_unit;
        long porcentaje_en_uso_cien = rss *100;
        long porcentaje_en_uso = porcentaje_en_uso_cien/total_ram;
        seq_printf(file_proc, "\"porcentaje_ram\":%ld\n", porcentaje_en_uso);
        seq_printf(file_proc, "}");
        i++;
    }
    seq_printf(file_proc, "]\n");
    seq_printf(file_proc, "}\n");
    return 0;
}

static int al_abrir(struct inode *inode, struct file *file){
    return single_open(file, escribir_archivo, NULL);
}

static struct proc_ops operaciones = 
{
    .proc_open = al_abrir,
    .proc_read = seq_read
};

static int __init modulo_insertar(void){
    proc_create("cpu_201900042",0, NULL,&operaciones);
    printk(KERN_INFO "201900042\n");
    return 0;
}

static void __exit modulo_remove(void) {
    remove_proc_entry("cpu_201900042", NULL);
    printk(KERN_INFO "Rodrigo Alejandro Hernández de León\n");
}

module_init(modulo_insertar);
module_exit(modulo_remove);