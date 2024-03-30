
#include "userModule.h"
#ifndef START_PAGE
#define START_PAGE
vector<User> allUsers;
inline void insertuser(User& new_user){
    allUsers.push_back(new_user);
}
class start_page{
    public:
    int flag;
    start_page();
};
 class Create_Account{
    public:
    Create_Account();
    int choice;
    void Create_User();
    void Create_designer();
};
class Login_Account{
    public:
    Login_Account();
    private: 
    bool check_details();
};
#endif
