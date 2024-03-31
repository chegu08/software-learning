//cannot go to one page to other page
#include "headers.h"
#include<iostream>
#include<string>
#include<vector>
using namespace std;
void db::insertDesigner(designer& new_designer){
    allDesigners.push_back(new_designer);
}
int Login_Account::check_designer_details(string Name,string pw){
    for(designer x:designer_obj.allDesigners){
        //0 indiating a match
        if(Name==x.name&&pw==x.password) return 0;
        //1 indicating incorret password
        else if(Name==x.name&&pw!=x.password) return 1;
    }
    //2 indicating the user does not exist 
    return 2;
};
int Login_Account::get_designer_Id(string name,string password)
{
      for(designer x:designer_obj.allDesigners){
      
        if(name==x.name&&password==x.password) return x.id;
        break;

    }
    
};
designerHomePage::designerHomePage(designer curr_designer) 
{
    cout<< "Enter 1 to veiw your profile\n";
    cout<< "Enter 2 to edit your profile\n";
    cout<< "Enter 3 to veiw the orders you have recived\n";
    int choice;
    cin>>choice;
    do
    {
        switch (choice)
        {
        case 1:
        {  
          veiwProfile(curr_designer);
          break;
        }
        case 2:
        {
          editProfile(curr_designer);
          break;  
        }
        
        case 3:
        {   
         viewOrders(curr_designer);         
         break;
        }
        default:
        {
            cout<<"Enter a valid input/n";
            break;
        }
            
        }
    } while (choice>3);
}

void designerHomePage::editProfile(designer curr_designer)
{    int  flag=0;
    do
    {   string feild;
        cout<<"Enter the feild you want to change/n";
        cin>>feild;
        cout<<"Renter the "<<feild<<endl;
        if(feild=="name")
        cin>>curr_designer.name;
        else if(feild=="address")
        cin>>curr_designer.address;
        else if(feild=="contactNo")
        cin>>curr_designer.contactNumber;
        else if(feild=="emailId")
        cin>>curr_designer.mailID;
        cout<<"if changes are done enter enter 1 else enter 0/n";
        cin>>flag;
    }while(!flag);
};

void designerHomePage::veiwProfile(designer curr_designer)
{
       cout<<"\t\tWELCOME\n";
       cout<<"Name : "<<curr_designer.name<<endl;
       cout<<"MailID :"<<curr_designer.address<<endl;
       cout<<"Age :"<<curr_designer.age<<endl;
       cout<<"Address :"<<curr_designer.address<<endl;
       cout<<"Contact Number :"<<curr_designer.contactNumber<<endl;
       
};

void designerHomePage :: viewOrders(designer curr_designer)
{
    cout<<"\t\t\t\t\tTHESE  ARE YOUR ORDERS\t\t\t\t\t\n";
    int num=1;
    for(designerorder orders:designer_obj.alldesignerOrders[curr_designer.id-1])
    {   
        cout<<"order"<<num<<":\n";
        cout<<"Product ID:"<<orders.orderid<<endl;
        cout<<"Order Description:"<<orders.productDescription<<endl;
        cout<<"Costumer Name:"<<orders.cus_name<<endl;
        cout<<"Costumer Contact Detail:"<<orders.phnum<<endl;
        cout<<"Costumer MailID:"<<orders.cus_mail<<endl;
        if(orders.paid)
        {cout<<"OrderDetails:"<<endl;
          cout<<"Transaction Id:"<<orders.pd->transactionID<<endl;
          cout<<"Paid Amount:"<<orders.pd->paidAmount<<endl;
           cout<<"Payment Date:"<<orders.pd->paymentDate<<endl;
        cout<<"Tentative Shipment Date:"<<orders.ten_date<<endl;
        ++num;
        }

        
    }
    cout<<"To inspect the orders enter 1";
    int choice;
    cin>>choice;

    switch (choice)
    {
    case 2:
        {  cout<<"Enter the product number u need to inspect\n";
            int pro_no;
            cin>>pro_no;
         
            inspectProduct(designer_obj.alldesignerOrders[curr_designer.id][pro_no-1],pro_no);
            break;
        }
    default:
        break;
    }

};


void designerHomePage::inspectProduct(designerorder curr_order,int id)
{  do{
    if(curr_order.acceptance_flag=="Pending")
    {
     cout<<"Enter 1 if u accept and 2 for  reject:\n";
     int choice;
     cin>>choice;
     switch (choice)
     {
     case 1:
        curr_order.acceptance_flag= "Accepted";
        break;
     case 2:
         designer_obj.alldesignerOrders[id].pop_back();
     default:
        break;
     }

    }
    else if(curr_order.acceptance_flag=="Accepted")
    {   if(curr_order.paid)
      { cout<<"The user has paid";
         cout<<"OrderDetails:"<<endl;
          cout<<"Transaction Id:"<<curr_order.pd->transactionID<<endl;
          cout<<"Paid Amount:"<<curr_order.pd->paidAmount<<endl;
           cout<<"Payment Date:"<<curr_order.pd->paymentDate<<endl;
      }
       else
       cout<<"The user has still not paid";
    }
    cout<<"If you have started  working on this order press 1 \n";
    int startedFlag;
    cin>>startedFlag;
    if(startedFlag)
    {curr_order.started=true;
    cout<<"please enter a tentative date for shipment\n";
    string date;
    cin>>date;
    curr_order.ten_date=date;
    }
    else
    curr_order.started=false;
}while (1);


}