//finish see orders
#include "headers.h"
#include<bits/stdc++.h>
#include<ctime>
#include<cctype>
#include<algorithm>
using namespace std;

void db::insertuser(User& new_user){
    allUsers.push_back(new_user);
}

int Login_Account::check_user_details(string Name,string pw){
    for(User x:user_obj.allUsers){
        //0 indiating a match
        if(Name==x.name&&pw==x.password) return 0;
        //1 indicating incorret password
        else if(Name==x.name&&pw!=x.password) return 1;
    }
    //2 indicating the user does not exist 
    return 2;
}

designer& user_home::display_designers(){
    int choose;
    cout<<"choose any designer by selecting their id\n";
    for( designer x:designer_obj.allDesigners){
        cout<<x.id<<"."<<x.name<<endl;
    }
    cin>>choose;
    return designer_obj.allDesigners[choose];
}

void user_home::cancelproduct(User cur_user,int o_id,int des_id){
    for(int i=0;i<designer_obj.alldesignerOrders[des_id].size();i++){
        designerorder x=designer_obj.alldesignerOrders[des_id][i];
        if(x.orderid==o_id){
            designer_obj.alldesignerOrders[des_id].erase(designer_obj.alldesignerOrders[des_id].begin()+i);
        }
    }
    for(int i=0;i<user_obj.alluserOrders[cur_user.id].size();i++){
        userorder x=user_obj.alluserOrders[cur_user.id][i];
        if(x.orderDesc->orderId==o_id){
            user_obj.alluserOrders[cur_user.id][i].orderDesc->orderstatus="cancelled";
        }
    }
}

void user_home::request_designer(User cur_user,designer des,string description,int n){
    //create a designer order
    time_t now = time(0);
    char* date_time = ctime(&now);
    string cur_date="";
    cur_date=cur_date+date_time[8]+date_time[9];
    designerorder cur_design;
    srand(time(NULL));
    cur_design.orderid=rand()%10000;
    cur_design.productDescription=description;
    cur_design.cus_name=cur_user.name;
    cur_design.cus_mail=cur_user.mailID;
    cur_design.phnum=cur_user.phoneNumber;
    cur_design.orderDate=date_time;
    cur_design.acceptance_flag="pending";
    cur_design.ten_date="--:--:--";
    cur_design.started=false;
    cur_design.paid=false;
    cur_design.noOfItems=n;
    designer_obj.alldesignerOrders[des.id].push_back(cur_design);
    cout<<"Your order request has been successfully sent\n";
    userorder cur_order;
    cur_order.orderDesc=new orderDescription(cur_design.orderid,cur_design.noOfItems,cur_design.orderDate,cur_design.productDescription,"pending");
    cur_order.desgDesc=new designerDescription(cur_design.phnum,des.name,des.id);
    cur_order.shipmentDate="--:--:--";
    user_obj.alluserOrders[cur_user.id].push_back(cur_order);
}

void user_home::placeorder(User cur_user,string description){
    int choice,des_id,n;
    string new_description;
    cout<<"To edit your order enter 1,else any other digit\n";
    cin>>choice;
    if(choice==1) {

        //if an order is placed it should no longer be in cart
        user_obj.alluserCarts[cur_user.id].pop_back();

        cout<<"Enter the new decription of your product\n";
        cin.ignore();
        getline(cin,new_description);
        description=new_description;
    }
    cout<<"Enter the number of items of your product\n";
    cin>>n;
    cout<<"The designers will be dislayed in the order:(<des_id>.<des_name>)\n";
    
    designer &cur_designer=display_designers();
    request_designer(cur_user,cur_designer,description,n);
}

void user_home::addtocart(User cur_user,string description){
    int choice;
    user_obj.alluserCarts[cur_user.id].push_back(description);
    cout<<"Your product has been successfully added to your cart\n";
    cout<<"To buy this product press 1\n";
    cout<<"To return to home page press any other key\n";
    cin>>choice;
    if(choice==1) placeorder(cur_user,description);
    else user_home cur_user_home(cur_user.id);
}

void user_home::create_product(User cur_user){
    string description;
    int choice;
    cout<<"Describe your product\n";
    cin.ignore();
    getline(cin,description);
    cout<<"To add this design to your cart enter 1\n";
    cout<<"To place order enter any other digit\n";
    cin>>choice;
    if(choice==1) addtocart(cur_user,description);
    else placeorder(cur_user,description);
}

void user_home::seeProfile(User cur_user){
    cout<<"Name : "<<cur_user.name<<endl;
    cout<<"Gender : "<<cur_user.gender<<endl;
    cout<<"Contact Number : "<<cur_user.phoneNumber<<endl;
    cout<<"Email : "<<cur_user.mailID<<endl;
    cout<<"Address : "<<cur_user.address<<endl;
}

void user_home::editprofile(User cur_user){
    int flag=0;
    string field;
    do{
        cout<<"Enter the field you need change\n";
        cin>>field;
        transform(field.begin(), field.end(), field.begin(),
                   [](unsigned char c) { return tolower(c); });
        if(field=="name"){
            cout<<"Enter name\n";
            cin>>cur_user.name;
        }
        else if(field=="mailid"){
            cout<<"Enter mailid\n";
            cin>>cur_user.mailID;
        }
        else if(field=="gender"){
            cout<<"Enter gender\n";
            cin>>cur_user.gender;
        }
        else if(field=="address"){
            cout<<"Enter address\n";
            cin>>cur_user.address;
        }
        else if(field=="age"){
            cout<<"Enter age\n";
            cin>>cur_user.age;
        }
        else if(field=="phonenumber"){
            cout<<"Enter contact number\n";
            cin>>cur_user.phoneNumber;
        }
        else if(field=="password"){
            string old_pw;
            cout<<"Enter your old password\n";
            cin>>old_pw;
            if(old_pw==cur_user.password){
                string new_pw;
                string confirmation;
                int a=0;
                cout<<"Enter your new password\n";
                cin>>new_pw;
                do{
                    cout<<"Confirm your new password\n";
                    cin>>confirmation;
                    if(confirmation!=new_pw){
                        
                        cout<<"passwords didn't match\n";
                        cout<<"To re-enter your password enter 1\n";
                        cout<<"To exit press any other digit\n";
                        cin>>a;
                        if(a!=1){
                            cout<<"Password has not been changed\n";
                            break;
                        } 
                    }

                }while(confirmation!=new_pw);
                if(confirmation==new_pw) cur_user.password=new_pw;
            }
            else cout<<"Incorrect password\n";
        }
        cout<<"To change further enter 1\n";
        cin>>flag;
    }while(!flag);
}

void user_home::see_cart(User cur_user){
    cout<<"Your products\n";
    int ind=0;
    for(string x:user_obj.alluserCarts[cur_user.id]){
        cout<<ind++<<" . "<<x<<endl;
    }
    cout<<"To place an order choose the product using its index";
    do{
        cin>>ind;
        placeorder(cur_user,user_obj.alluserCarts[cur_user.id][ind]);
        cout<<"To exit press -1 else press any other digit\n";
        cin>>ind;
    }while(ind!=-1);
}
void user_home::updateorderstastus(User cur_user){

    //current time 
    time_t now = time(0);
    char* date_time = ctime(&now);
    string cur_date="";
    cur_date=cur_date+date_time[8]+date_time[9];
    
    for(int i=0;i<user_obj.alluserOrders[cur_user.id].size();i++){
        userorder x=user_obj.alluserOrders[cur_user.id][i];
        int count=0;
        for(designerorder y:designer_obj.alldesignerOrders[x.desgDesc->id]){
            if(y.orderid==x.orderDesc->orderId){
                int expecteddate=stoi(""+y.ten_date[0]+y.ten_date[1]);
                if(y.started==true&&stoi(date_time)>=expecteddate){
                    x.orderDesc->orderstatus="shipped";
                    x.shipmentDate=y.ten_date;
                }
                else if(y.started==true&&stoi(date_time)>=expecteddate){
                    x.orderDesc->orderstatus="started";
                    x.shipmentDate=y.ten_date;
                } 
                else if(y.acceptance_flag=="accepted"){
                    x.orderDesc->orderstatus="accepted";
                }
                else if(y.acceptance_flag=="pending"){
                    x.orderDesc->orderstatus="pending";
                }
                else x.orderDesc->orderstatus="cancelled";
                count++;
            } 
        }
        if(count==0) x.orderDesc->orderstatus="rejected";
        user_obj.alluserOrders[cur_user.id][i]=x;
    }
}

void user_home::see_orders(User cur_user){
    int choice;
    updateorderstastus(cur_user);
    cout<<"Your current orders :\n";
    for(int i=0;i<user_obj.alluserOrders[cur_user.id].size();i++){
        userorder x=user_obj.alluserOrders[cur_user.id][i];
        cout<<x.orderDesc->orderId<<"   "<<x.orderDesc->orderstatus<<endl;
    }
    
    do{
        cout<<"To cancel any orders enter 1\n";
        cout<<"To pay for any order enter 2\n";
        cout<<"To exit press any other digit\n";
        cin>>choice;
        if(choice==1){
            int id,count=0;
            cout<<"Enter order id\n";
            cin>>id;
            for(int i=0;i<user_obj.alluserOrders[cur_user.id].size();i++){
                userorder x=user_obj.alluserOrders[cur_user.id][i];
                if(x.orderDesc->orderId==id){
                    count++;
                    if(x.orderDesc->orderstatus=="pending"||x.orderDesc->orderstatus=="accepted") cancelproduct(cur_user,x.orderDesc->orderId,x.desgDesc->id);
                    else cout<<"This order is not elegible to cancel\n";
                    break;
                }
            }
            if(count==0) cout<<"Enter a correct order id\n";
        }
        if(choice==2){
            int id,count=0;
            cout<<"Enter order id\n";
            cin>>id;
            for(int i=0;i<user_obj.alluserOrders[cur_user.id].size();i++){
                userorder x=user_obj.alluserOrders[cur_user.id][i];
                if(x.orderDesc->orderId==id){
                    count++;
                    if(x.orderDesc->orderstatus=="accepted") ;//(cur_user,x.orderDesc->orderId,x.desgDesc->id);
                    else cout<<"You cant pay for this order\n";
                    break;
                }
            }
            if(count==0) cout<<"Enter a correct order id\n";
        }
    }while(1);
}

user_home::user_home(int id){

    User cur_user=user_obj.allUsers[id];
    char choice;
    
    do{
        cout<<"\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttHOME PAGE\n";
        cout<<"To create a product enter 1\n";
        cout<<"To see your orders enter 2\n";
        cout<<"To see your profile enter 3\n";
        cout<<"To edit your profile enter 4\n";
        cout<<"To see your cart enter 5\n";
        cout<<"To logout enter 6\n";
        cin>>choice;
        switch(choice){
            case '1':{
                create_product(cur_user);
                break;
            }
            case '2':{
                see_orders(cur_user);
                break;
            }
            case '3':{
                seeProfile(cur_user);
                break;
            }
            case '4':{
                editprofile(cur_user);
                break;
            }
            case '5':{
                see_cart(cur_user);
                break;
            }
            default:{
                if(choice!='6')
                cout<<"Enter a correct choice\n";
                break;
            }
        }
        if(choice=='6'){
            Login_Account cur_account;
            break;
        }
    }while(1);
    
}