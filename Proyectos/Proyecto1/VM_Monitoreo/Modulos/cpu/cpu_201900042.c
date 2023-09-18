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

static int escribir_archivo(struct seq_file *file_proc, void *v){
    
    unsigned long total_cpu_time = jiffies_to_msecs(get_jiffies_64());
    unsigned long total_usage = 0;

    for_each_process(task){
        unsigned long cpu_time = jiffies_to_msecs(task->utime + task->stime);
        unsigned long cpu_percentage = (cpu_time * 100) / total_cpu_time;
        total_usage += cpu_time;
    }
    seq_printf(file_proc, "{\n\"porcentaje_cpu\":%d,\n", (total_usage * 100) / total_cpu_time);
    seq_printf(file_proc, "\"procesos\":[\n");

    unsigned long total_ram = totalram_pages();
    int i = 0;
    for_each_process(task){
        if(i != 0){
            seq_printf(file_proc, ",\n");
        }else{
            seq_printf(file_proc, "\n");
        }
        seq_printf(file_proc, "{\n\"pid\":%d,\n", task->pid);
        seq_printf(file_proc, "\"nombre\":\"%s\",\n", task->comm);
        seq_printf(file_proc, "\"usuario\":%d,\n", task->cred->uid);
        seq_printf(file_proc, "\"estado\":%ld,\n", task->__state);
        unsigned long rss;
        if(task->mm){
            rss = get_mm_rss(task->mm) << PAGE_SHIFT;
        }else{
            rss = 0;
        }
        int porcentaje_ram = (rss *100) / total_ram;
        seq_printf(file_proc, "\"porcentaje_ram\":%d,\n", porcentaje_ram);
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