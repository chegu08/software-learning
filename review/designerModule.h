#include<iostream>
#include<string>
#include<vector>
using namespace std;
#ifndef DesignerModule
#define DesignerModule
class Create_Account;
class Login_Account;
class designerHomePage;
class user_home;
class designer{
    public:
    string name;
    string mailID;
    protected:
    int age;
    int id;
    string gender;
    string address;
    long long contactNumber;
    string password;
    
  friend Create_Account;
  friend Login_Account;
  friend designerHomePage;
  friend user_home;
};
struct ds_paymentdetails{
long long transactionID;
string paymentDate;
long paidAmount;

ds_paymentdetails(long long pid,string date,long amount )
{transactionID=pid;
paymentDate=date;
paidAmount=amount;}
};

class designerorder{
    protected:
      bool started;
       bool paid;
       string orderDate;
      ds_paymentdetails* pd;
       string productDescription;
        long orderid;
        string cus_name,cus_mail;
        long long phnum;
        string acceptance_flag;
        string ten_date;//(dd:mm:yy)
        int noOfItems;
    friend designerHomePage;
    friend user_home;
};
class designerHomePage{
  protected:
  designerHomePage(designer);
  void veiwProfile(designer);
  void editProfile(designer);
  void viewOrders(designer);
  void inspectProduct(designerorder,int);
   friend Login_Account;
};

#endif