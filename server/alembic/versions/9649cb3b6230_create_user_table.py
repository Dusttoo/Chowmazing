"""create user table

Revision ID: 9649cb3b6230
Revises: 
Create Date: 2022-10-05 12:33:45.579978

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9649cb3b6230'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        "users",
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("username", sa.String),
        sa.Column("hashed_password", sa.String),
        sa.Column("email", sa.String),
    )


def downgrade():
    op.drop_table("users")
