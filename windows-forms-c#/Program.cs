using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace GoogleFirebase
{
    static class Program
    {
        /// <summary>
        /// Ponto de entrada principal para o aplicativo.
        /// </summary>
        [STAThread]
        static void Main()
        {
            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);
            using (var frmLogin = new FormLogin())
            {
                if (frmLogin.ShowDialog().Equals(DialogResult.OK))
                {
                    var frmMain = new FormMain();
                    frmMain.AccessToken = Guid.NewGuid().ToString();
                    frmMain.Email = frmLogin.Login;
                    Application.Run(frmMain);
                }                
            }                
        }
    }
}
