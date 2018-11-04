using GoogleFirebase.Security;
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
    public partial class FormLogin : Form
    {
        public string Login
        {
            get
            {
                return txtLogin.Text;
            }
        }

        public FormLogin()
        {
            InitializeComponent();
        }

        private bool IsValid
        {
            get
            {
                if (string.IsNullOrEmpty(txtLogin.Text))
                {
                    MessageBox.Show("Informe um login!");
                    return false;
                }
                if (string.IsNullOrEmpty(txtPassword.Text))
                {
                    MessageBox.Show("Informe uma senha!");
                    return false;
                }
                var key = System.Configuration.ConfigurationManager.AppSettings["CryptoKey"].ToString();
                var result = EncryptHelper.Encrypt(txtLogin.Text + "|" + txtPassword.Text, key);
                txtLogin.Text = result.Result;
                txtPassword.Text = result.IV;
                return false;
            }
        }

        private void button1_Click(object sender, EventArgs e)
        {
            
            DialogResult = IsValid ? DialogResult.OK : DialogResult.None;
        }

        private void linkLabel2_LinkClicked(object sender, LinkLabelLinkClickedEventArgs e)
        {
            using (var form = new FormUserCreate())
            {
                form.ShowDialog();
            }
        }
    }
}
