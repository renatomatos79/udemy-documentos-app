using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace GoogleFirebase
{
    public partial class FormMain : Form
    {
        public string AccessToken { get; set; }
        public string Email { get; set; }

        public FormMain()
        {
            InitializeComponent();
        }

        private void btnNew_Click(object sender, EventArgs e)
        {
            using (var form = new FormDocumentCreate())
            {
                form.ShowDialog();
            }
        }

        private void toolStripButton2_Click(object sender, EventArgs e)
        {
            if (dlgUpload.ShowDialog() == DialogResult.OK)
            {

            }
        }

        private void RefreshGrid()
        {
            var documents = new List<dynamic>
            {
                new
                {
                    createDate =  "October 29, 2018 at 12:18:00 AM UTC-3",
                    description = "foto do renato",
                    documentURL = "https://firebasestorage.googleapis.com/v0/b/treinamento-fa36b.appspot.com/o/renato.jpg?alt=media&token=40d1e13e-2cfc-4801-ab58-5da3e592391c",
                    id = "AxW81D8uXun52urozjCw",
                    title = "Foto do Renato"
                },
                new
                {
                    createDate =  "October 26, 2018 at 1:01:58 AM UTC-3",
                    description = "CV Renato versão 15",
                    documentURL = "https://firebasestorage.googleapis.com/v0/b/treinamento-fa36b.appspot.com/o/renato-matos-resume-v15.pdf?alt=media&token=dc2bbf86-8a08-4270-adc0-7449513b1969",
                    id = "x4xDVJKtooKY0f5mexE9",
                    title = "Curriculo"
                }
            };

            dataGridView1.AutoGenerateColumns = false;
            dataGridView1.DataSource = documents.ToList();
            dataGridView1.Refresh();
        }

        private void FormMain_Load(object sender, EventArgs e)
        {
            lblToken.Text = this.AccessToken;
            lblUserName.Text = this.Email;
            RefreshGrid();
        }
    }
}
