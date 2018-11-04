using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace GoogleFirebase.Security
{
    public static class EncryptHelper
    {
        public static EncryptModel Encrypt(string text, string key)
        {
            var bytes = UTF8Encoding.UTF8.GetBytes(text);
            var tdes = new TripleDESCryptoServiceProvider
            {
                Key = UTF8Encoding.UTF8.GetBytes(key)
            };
            var resultArray = tdes.CreateEncryptor().TransformFinalBlock(bytes, 0, bytes.Length);
            return new EncryptModel
            {
                IV = Convert.ToBase64String(tdes.IV),
                Result = Convert.ToBase64String(resultArray, 0, resultArray.Length)
        };
        }
    }
}
