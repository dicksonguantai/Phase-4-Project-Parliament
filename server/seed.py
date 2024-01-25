from app import app, db
from models import MP, Bill, User, VotingRecord
from datetime import date
from faker import Faker

fake = Faker()

def clear_data():
    db.session.query(VotingRecord).delete()
    db.session.query(Bill).delete()
    db.session.query(User).delete()
    db.session.query(MP).delete()
    db.session.commit()

def seed_database():
    with app.app_context():
        # Clear existing data
        clear_data()

        # Create tables
        db.create_all()

        # Seed MPs
        mps = []
        for _ in range(20):
            mp = MP(name=fake.name(), affiliation=fake.word(), constituency=fake.word())
            mps.append(mp)
            db.session.add(mp)
        db.session.commit()

        # Seed Users
        users = []
        for _ in range(30):
            first_name = fake.first_name()
            last_name = fake.last_name()
            email = fake.email()
            password = fake.password()
            if fake.boolean():  # Randomly assign role (user or mp)
                role = 'mp'
            else:
                role = 'user'
            password_hash = bcrypt.generate_password_hash(password.encode('utf-8')).decode('utf-8')
            user = User(first_name=first_name, last_name=last_name, role=role, password=password_hash, email=email)
            users.append(user)
            db.session.add(user)
        db.session.commit()

        # Seed Bills
        for _ in range(30):
            mp_id = fake.random_element(elements=[mp.id for mp in mps])
            bill = Bill(
                title=fake.sentence(),
                description=fake.paragraph(),
                submission_date=fake.date_between(start_date='-1y', end_date='today'),
                outcome_status=fake.boolean(),
                upvotes=fake.random_int(min=0, max=100),
                downvotes=fake.random_int(min=0, max=100),
                mp_id=mp_id
            )
            db.session.add(bill)
        db.session.commit()

        # Seed Voting Records
        for _ in range(20):
            bill_id = fake.random_element(elements=[bill.id for bill in Bill.query.all()])
            voting_record = VotingRecord(
                bill_id=bill_id,
                vote_status=fake.boolean()
            )
            db.session.add(voting_record)
        db.session.commit()

if __name__ == '__main__':
    seed_database()
